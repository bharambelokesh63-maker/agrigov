import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Polygon, Popup, Tooltip, useMap, LayersControl } from "react-leaflet";
import { supabase } from "@/integrations/supabase/client";
import { MAHARASHTRA_DISTRICTS_GEO, MAHARASHTRA_STATE_BOUNDARY, CROP_SUITABILITY_ZONES } from "@/lib/maharashtra-geo";
import { Activity, Layers, ShieldAlert, CheckCircle2, AlertTriangle, MapPin, Filter, Eye, TrendingUp, Satellite } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

export const Route = createFileRoute("/_app/gis")({ component: GISPage });

interface AppRow {
  id: string; farmer_id: string; status: string; crop: string; area_acres: number;
  priority_score: number; created_at: string;
  ai_fraud: { riskScore?: number; flagged?: boolean } | null;
  scheme: { name: string } | null;
  profile: { full_name: string | null; village: string | null; district: string | null; taluka: string | null } | null;
}
interface GrievRow { id: string; status: string; priority: string; ai_category: string | null; profile: { district: string | null } | null; }

type MapMode = "applications" | "fraud" | "crop_suitability" | "grievances" | "performance";

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(value);
  useEffect(() => {
    const start = ref.current; const end = value; const duration = 600;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) { setDisplay(end); ref.current = end; return; }
      setDisplay(Math.round(start + (end - start) * (elapsed / duration)));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{display}</>;
}

function MapAutoFit() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([[15.6, 72.6], [22.0, 80.8]], { padding: [20, 20] });
  }, [map]);
  return null;
}

function GISPage() {
  const [apps, setApps] = useState<AppRow[]>([]);
  const [griev, setGriev] = useState<GrievRow[]>([]);
  const [mode, setMode] = useState<MapMode>("applications");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street");

  const load = useCallback(async () => {
    const [a, g] = await Promise.all([
      supabase.from("applications").select("*, scheme:schemes(name)").order("created_at", { ascending: false }),
      supabase.from("grievances").select("id, status, priority, ai_category, profile:profiles(district)"),
    ]);
    const rows = (a.data ?? []) as unknown as AppRow[];
    const farmerIds = [...new Set(rows.map(r => r.farmer_id).filter(Boolean))];
    const profileMap = new Map();
    if (farmerIds.length > 0) {
      const { data: profiles } = await supabase.from("profiles").select("id, full_name, village, district, taluka").in("id", farmerIds);
      (profiles ?? []).forEach((p: any) => profileMap.set(p.id, p));
    }
    setApps(rows.map(r => ({ ...r, profile: profileMap.get(r.farmer_id) ?? null })));
    setGriev((g.data ?? []) as unknown as GrievRow[]);
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    load();
    const ch = supabase.channel("gis-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "applications" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "grievances" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  // Compute district-level stats
  const districtStats: Record<string, { total: number; approved: number; rejected: number; fraud: number; pending: number; grievances: number; crops: Record<string, number> }> = {};
  apps.forEach(a => {
    const d = a.profile?.district || "Unknown";
    if (!districtStats[d]) districtStats[d] = { total: 0, approved: 0, rejected: 0, fraud: 0, pending: 0, grievances: 0, crops: {} };
    districtStats[d].total++;
    if (a.status === "approved") districtStats[d].approved++;
    if (a.status === "rejected") districtStats[d].rejected++;
    if (a.ai_fraud?.flagged) districtStats[d].fraud++;
    if (["submitted", "under_review", "field_verified"].includes(a.status)) districtStats[d].pending++;
    districtStats[d].crops[a.crop] = (districtStats[d].crops[a.crop] ?? 0) + 1;
  });
  griev.forEach(g => {
    const d = g.profile?.district || "Unknown";
    if (!districtStats[d]) districtStats[d] = { total: 0, approved: 0, rejected: 0, fraud: 0, pending: 0, grievances: 0, crops: {} };
    districtStats[d].grievances++;
  });

  const totalApps = apps.length;
  const totalFraud = apps.filter(a => a.ai_fraud?.flagged).length;
  const totalApproved = apps.filter(a => a.status === "approved").length;
  const totalPending = apps.filter(a => ["submitted", "under_review"].includes(a.status)).length;
  const approvalRate = totalApps > 0 ? Math.round((totalApproved / totalApps) * 100) : 0;

  const getDistrictColor = (name: string): string => {
    const stats = districtStats[name];
    if (!stats || stats.total === 0) return "rgba(100,116,139,0.15)";
    if (mode === "applications") {
      const intensity = Math.min(stats.total / 20, 1);
      return `rgba(34,197,94,${0.15 + intensity * 0.55})`;
    }
    if (mode === "fraud") {
      const rate = stats.fraud / Math.max(stats.total, 1);
      if (rate > 0.3) return "rgba(239,68,68,0.7)";
      if (rate > 0.15) return "rgba(249,115,22,0.6)";
      if (rate > 0) return "rgba(234,179,8,0.5)";
      return "rgba(34,197,94,0.3)";
    }
    if (mode === "grievances") {
      const count = stats.grievances;
      if (count > 5) return "rgba(239,68,68,0.6)";
      if (count > 2) return "rgba(249,115,22,0.5)";
      if (count > 0) return "rgba(234,179,8,0.4)";
      return "rgba(100,116,139,0.15)";
    }
    if (mode === "performance") {
      const rate = stats.total > 0 ? stats.approved / stats.total : 0;
      if (rate > 0.6) return "rgba(34,197,94,0.6)";
      if (rate > 0.3) return "rgba(234,179,8,0.5)";
      return "rgba(239,68,68,0.5)";
    }
    if (mode === "crop_suitability") {
      const zone = CROP_SUITABILITY_ZONES[name];
      if (!zone) return "rgba(100,116,139,0.15)";
      return zone.color + "88";
    }
    return "rgba(100,116,139,0.15)";
  };

  const selStats = selectedDistrict ? districtStats[selectedDistrict] : null;
  const selZone = selectedDistrict ? CROP_SUITABILITY_ZONES[selectedDistrict] : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Satellite className="h-6 w-6 text-primary" /> GIS Command Center
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time geographic intelligence — Maharashtra agricultural governance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-success">
            <Activity className="h-3.5 w-3.5 animate-pulse" /> LIVE
          </div>
          <span className="text-[10px] text-muted-foreground">Updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Live KPI Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <KpiMini label="Total Applications" value={<AnimatedCounter value={totalApps} />} color="text-primary" />
        <KpiMini label="Approval Rate" value={<><AnimatedCounter value={approvalRate} />%</>} color="text-success" />
        <KpiMini label="Pending" value={<AnimatedCounter value={totalPending} />} color="text-warning" />
        <KpiMini label="Fraud Alerts" value={<AnimatedCounter value={totalFraud} />} color="text-destructive" />
        <KpiMini label="Grievances" value={<AnimatedCounter value={griev.length} />} color="text-info" />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground">Map Layer:</span>
        {(["applications", "fraud", "crop_suitability", "grievances", "performance"] as MapMode[]).map(m => (
          <Button key={m} size="sm" variant={mode === m ? "default" : "outline"} className="h-7 text-[11px] capitalize"
            onClick={() => setMode(m)}>{m.replace("_", " ")}</Button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant={mapStyle === "street" ? "default" : "outline"} className="h-7 text-[11px]"
            onClick={() => setMapStyle("street")}>Street</Button>
          <Button size="sm" variant={mapStyle === "satellite" ? "default" : "outline"} className="h-7 text-[11px]"
            onClick={() => setMapStyle("satellite")}>Satellite</Button>
        </div>
      </div>

      {/* Map + Sidebar */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Map */}
        <div className="lg:col-span-3 rounded-xl border border-border overflow-hidden shadow-lg" style={{ height: 560 }}>
          <MapContainer center={[19.5, 76.5]} zoom={7} style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true} zoomControl={true}>
            <MapAutoFit />
            {mapStyle === "street" ? (
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>' />
            ) : (
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri' />
            )}

            {/* State boundary */}
            <Polygon positions={MAHARASHTRA_STATE_BOUNDARY} pathOptions={{ color: "#6366f1", weight: 2, fillOpacity: 0, dashArray: "8,4" }} />

            {/* District polygons */}
            {MAHARASHTRA_DISTRICTS_GEO.map(d => {
              const stats = districtStats[d.name];
              const isSelected = selectedDistrict === d.name;
              return (
                <Polygon key={d.name} positions={d.boundary}
                  pathOptions={{
                    color: isSelected ? "#6366f1" : "#475569",
                    weight: isSelected ? 3 : 1,
                    fillColor: getDistrictColor(d.name),
                    fillOpacity: 0.7,
                  }}
                  eventHandlers={{ click: () => setSelectedDistrict(isSelected ? null : d.name) }}>
                  <Tooltip direction="top" sticky>
                    <div className="text-xs">
                      <div className="font-bold">{d.name}</div>
                      {stats ? (
                        <div>Apps: {stats.total} · Fraud: {stats.fraud} · Approved: {stats.approved}</div>
                      ) : <div>No applications</div>}
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}

            {/* District center markers */}
            {MAHARASHTRA_DISTRICTS_GEO.map(d => {
              const stats = districtStats[d.name];
              if (!stats || stats.total === 0) return null;
              const isFraud = mode === "fraud" && stats.fraud > 0;
              return (
                <CircleMarker key={`m-${d.name}`} center={d.center}
                  radius={Math.max(6, Math.min(stats.total * 1.5, 25))}
                  pathOptions={{
                    color: isFraud ? "#ef4444" : "#6366f1",
                    fillColor: isFraud ? "#ef4444" : "#818cf8",
                    fillOpacity: 0.8, weight: 2,
                  }}
                  eventHandlers={{ click: () => setSelectedDistrict(d.name) }}>
                  <Tooltip permanent direction="center">
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{stats.total}</span>
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-4">
          {/* Legend */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {mode === "applications" && "Application Density"}
              {mode === "fraud" && "Fraud Risk Level"}
              {mode === "crop_suitability" && "Agro-Climatic Zones"}
              {mode === "grievances" && "Grievance Hotspots"}
              {mode === "performance" && "Approval Performance"}
            </h3>
            {mode === "fraud" && (
              <div className="space-y-1.5">
                <LegendItem color="rgba(239,68,68,0.7)" label="High Risk (>30%)" />
                <LegendItem color="rgba(249,115,22,0.6)" label="Medium (15-30%)" />
                <LegendItem color="rgba(234,179,8,0.5)" label="Low (<15%)" />
                <LegendItem color="rgba(34,197,94,0.3)" label="Clean" />
              </div>
            )}
            {mode === "applications" && (
              <div className="space-y-1.5">
                <LegendItem color="rgba(34,197,94,0.7)" label="High volume" />
                <LegendItem color="rgba(34,197,94,0.4)" label="Medium" />
                <LegendItem color="rgba(34,197,94,0.15)" label="Low / None" />
              </div>
            )}
            {mode === "performance" && (
              <div className="space-y-1.5">
                <LegendItem color="rgba(34,197,94,0.6)" label="Good (>60%)" />
                <LegendItem color="rgba(234,179,8,0.5)" label="Average (30-60%)" />
                <LegendItem color="rgba(239,68,68,0.5)" label="Poor (<30%)" />
              </div>
            )}
            {mode === "grievances" && (
              <div className="space-y-1.5">
                <LegendItem color="rgba(239,68,68,0.6)" label="Critical (>5)" />
                <LegendItem color="rgba(249,115,22,0.5)" label="Moderate (2-5)" />
                <LegendItem color="rgba(234,179,8,0.4)" label="Low (1)" />
              </div>
            )}
            {mode === "crop_suitability" && (
              <div className="space-y-1.5">
                <LegendItem color="#2563eb88" label="Konkan Coast" />
                <LegendItem color="#16a34a88" label="Western Ghat" />
                <LegendItem color="#ca8a0488" label="Deccan Plateau" />
                <LegendItem color="#b91c1c88" label="Marathwada" />
                <LegendItem color="#d9770688" label="Vidarbha" />
                <LegendItem color="#7c3aed88" label="Tribal Belt" />
                <LegendItem color="#dc262688" label="Drought Prone" />
              </div>
            )}
          </div>

          {/* District Detail Card */}
          {selectedDistrict && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-sm animate-in fade-in">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5 mb-3">
                <MapPin className="h-4 w-4" /> {selectedDistrict}
              </h3>
              {selStats ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <MiniStat label="Total Apps" value={selStats.total} />
                    <MiniStat label="Approved" value={selStats.approved} />
                    <MiniStat label="Pending" value={selStats.pending} />
                    <MiniStat label="Fraud" value={selStats.fraud} />
                    <MiniStat label="Rejected" value={selStats.rejected} />
                    <MiniStat label="Grievances" value={selStats.grievances} />
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Approval Rate</div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${selStats.total > 0 ? Math.round(selStats.approved / selStats.total * 100) : 0}%` }} />
                      </div>
                      <span className="text-xs font-bold">{selStats.total > 0 ? Math.round(selStats.approved / selStats.total * 100) : 0}%</span>
                    </div>
                  </div>
                  {selStats.fraud > 0 && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-[10px] font-semibold text-destructive uppercase mb-1">⚠ Fraud Rate</div>
                      <div className="text-sm font-bold text-destructive">{Math.round(selStats.fraud / selStats.total * 100)}%</div>
                    </div>
                  )}
                  {Object.keys(selStats.crops).length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Top Crops</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(selStats.crops).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([crop, count]) => (
                          <span key={crop} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{crop} ({count})</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Performance Grade */}
                  <div className="pt-2 border-t border-border">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Performance Grade</div>
                    <PerformanceGrade stats={selStats} />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No application data for this district.</p>
              )}
              {selZone && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Agro-Climatic Zone</div>
                  <div className="text-xs font-bold" style={{ color: selZone.color }}>{selZone.zone}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">Soil: {selZone.soilType} · Rain: {selZone.rainfall}</div>
                  <div className="mt-1 text-[11px]">Suitable: <span className="font-semibold">{selZone.crops.join(", ")}</span></div>
                </div>
              )}
            </div>
          )}

          {/* District Rankings */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              <TrendingUp className="inline h-3.5 w-3.5 mr-1" /> Top Districts
            </h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {Object.entries(districtStats)
                .filter(([n]) => n !== "Unknown")
                .sort((a, b) => b[1].total - a[1].total)
                .slice(0, 8)
                .map(([name, s], i) => (
                  <button key={name} onClick={() => setSelectedDistrict(name)}
                    className={`w-full flex items-center gap-2 rounded-lg p-2 text-left text-xs transition hover:bg-secondary/50 ${selectedDistrict === name ? "bg-primary/10 ring-1 ring-primary" : ""}`}>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</span>
                    <span className="flex-1 font-medium truncate">{name}</span>
                    <span className="font-bold">{s.total}</span>
                    {s.fraud > 0 && <span className="text-[9px] text-destructive font-bold">{s.fraud}🚨</span>}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiMini({ label, value, color }: { label: string; value: React.ReactNode; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: color }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-card border border-border p-2">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="text-sm font-bold"><AnimatedCounter value={value} /></div>
    </div>
  );
}

function PerformanceGrade({ stats }: { stats: { total: number; approved: number; fraud: number; pending: number } }) {
  const rate = stats.total > 0 ? stats.approved / stats.total : 0;
  const fraudRate = stats.total > 0 ? stats.fraud / stats.total : 0;
  let grade = "D"; let cls = "text-destructive bg-destructive/10";
  if (rate > 0.7 && fraudRate < 0.1) { grade = "A"; cls = "text-success bg-success/15"; }
  else if (rate > 0.5 && fraudRate < 0.2) { grade = "B"; cls = "text-primary bg-primary/10"; }
  else if (rate > 0.3) { grade = "C"; cls = "text-warning bg-warning/15"; }
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black ${cls}`}>{grade}</span>
      <span className="text-[11px] text-muted-foreground">
        {grade === "A" && "Excellent"}
        {grade === "B" && "Good"}
        {grade === "C" && "Needs Improvement"}
        {grade === "D" && "Critical"}
      </span>
    </div>
  );
}
