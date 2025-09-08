import { useStore } from "@nanostores/react";
import { rigs, deleteRig } from "../stores/rigs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditRigForm from "./EditRigForm";
import type { Rig } from "@/types";

export default function RigList() {
  const rigsData = useStore(rigs);
  const [editingRig, setEditingRig] = useState<any | null>(null);

  // Sorting state
  const [sortBy, setSortBy] = useState<keyof Rig>("name"); // Only valid keys
  const [ascending, setAscending] = useState<boolean>(true);

  // Status filter state
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Filter rigs by status
  const filteredRigs = rigsData.filter(rig =>
    statusFilter === "All" ? true : rig.status === statusFilter
  );

  // Sort filtered rigs
  const sortedRigs = [...filteredRigs].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "capacity") {
      return ascending ? valA - valB : valB - valA;
    } else {
      return ascending
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
  });

  return (
    <div className="grid gap-6">
      {editingRig && (
        <EditRigForm rig={editingRig} onClose={() => setEditingRig(null)} />
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="font-semibold">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-2"
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="status">Status</option>
            <option value="capacity">Capacity</option>
          </select>
          <Button variant="outline" onClick={() => setAscending(!ascending)}>
            {ascending ? "Asc" : "Desc"}
          </Button>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <label className="font-semibold">Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedRigs.map((rig) => (
          <Card key={rig.id} className="shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{rig.name}</h2>
              <p className="text-gray-600">{rig.location}</p>
              <p className="text-sm">
                Status: <b>{rig.status}</b>
              </p>
              <p className="text-sm">Capacity: {rig.capacity}</p>
              <div className="flex gap-2 mt-2">
                <Button variant="secondary" onClick={() => setEditingRig(rig)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteRig(rig.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
