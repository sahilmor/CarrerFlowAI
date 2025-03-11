import RoadmapPage from "../roadmap/page";

export default function RoadmapDashPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Roadmap Dashboard</h1>
      <p>Welcome to your roadmap dashboard.</p>
      
      {/* Fetch and display roadmaps */}
      <RoadmapPage />
    </div>
  );
}
