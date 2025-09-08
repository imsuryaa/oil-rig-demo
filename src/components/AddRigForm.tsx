import { useState } from "react";
import { addRig } from "../stores/rigs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddRigForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    status: "Active",
    capacity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRig(form);
    setForm({ name: "", location: "", status: "Active", capacity: "" });
  };

  return (
    <Card className="mb-6 shadow-lg">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <Input
            name="name"
            placeholder="Rig Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>
          <Input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />
          <Button type="submit">Add Rig</Button>
        </form>
      </CardContent>
    </Card>
  );
}