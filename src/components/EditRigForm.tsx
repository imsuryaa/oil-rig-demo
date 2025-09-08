import { useState } from "react";
import { updateRig } from "../stores/rigs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  rig: any;
  onClose: () => void;
};

export default function EditRigForm({ rig, onClose }: Props) {
  const [form, setForm] = useState({ ...rig });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRig(rig.id, form);
    onClose(); // close edit form after update
  };

  return (
    <Card className="mb-4 shadow-md bg-yellow-50">
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
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}