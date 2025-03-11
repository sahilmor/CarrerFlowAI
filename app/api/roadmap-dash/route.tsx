"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Roadmap {
  id: number;
  title: string;
}

const RoadmapDashboard = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        console.log("📡 Fetching roadmaps...");
        const { data } = await axios.get("/api/roadmap");

        if (data?.roadmaps?.length) {
          console.log("✅ Roadmaps received:", data.roadmaps);
          setRoadmaps(data.roadmaps);
        } else {
          console.warn("⚠ No roadmaps found.");
          setError("No roadmaps found.");
        }
      } catch (error) {
        console.error("🚨 Error fetching roadmaps:", error);
        setError("Failed to fetch roadmaps.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  if (loading) return <p>Loading roadmaps...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Roadmap Dashboard</h2>
      <ul>
        {roadmaps.map((roadmap) => (
          <li key={roadmap.id}>{roadmap.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapDashboard;
