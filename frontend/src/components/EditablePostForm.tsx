import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit3, X, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface EditablePostFormProps {
  initialData: {
    headline: string;
    context: string;
    solution: string;
    architecture: string;
    tags: string[];
  };
  onDataChange: (data: any) => void;
}

export const EditablePostForm = ({ initialData, onDataChange }: EditablePostFormProps) => {
  const [data, setData] = useState(initialData);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");

  const updateField = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onDataChange(newData);
  };

  const addTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      const newTags = [...data.tags, newTag.trim()];
      updateField('tags', newTags);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = data.tags.filter(tag => tag !== tagToRemove);
    updateField('tags', newTags);
  };

  const EditableField = ({ 
    field, 
    label, 
    value, 
    type = "text", 
    placeholder,
    multiline = false 
  }: {
    field: string;
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
    multiline?: boolean;
  }) => {
    const isEditing = editingField === field;
    
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingField(isEditing ? null : field)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        
        {isEditing ? (
          <div className="space-y-3">
            {multiline ? (
              <Textarea
                value={value}
                onChange={(e) => updateField(field, e.target.value)}
                placeholder={placeholder}
                className="min-h-[120px]"
                autoFocus
              />
            ) : (
              <Input
                type={type}
                value={value}
                onChange={(e) => updateField(field, e.target.value)}
                placeholder={placeholder}
                autoFocus
              />
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setEditingField(null)}>
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setEditingField(null);
                  setData({ ...data, [field]: initialData[field as keyof typeof initialData] });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-700 whitespace-pre-wrap">
            {value || <span className="text-gray-400 italic">{placeholder}</span>}
          </div>
        )}
      </Card>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI-Generated Post Content
        </h2>
        <p className="text-gray-600">
          Review and edit the content generated from your chat. Click the edit icon to make changes.
        </p>
      </div>

      <EditableField
        field="headline"
        label="Headline"
        value={data.headline}
        placeholder="Enter a compelling headline for your solution..."
      />

      <EditableField
        field="context"
        label="Problem Context"
        value={data.context}
        placeholder="Describe the problem you were facing..."
        multiline
      />

      <EditableField
        field="solution"
        label="Solution"
        value={data.solution}
        placeholder="Explain how you solved the problem..."
        multiline
      />

      <EditableField
        field="architecture"
        label="Architecture Summary"
        value={data.architecture}
        placeholder="Summarize the technical approach or architecture..."
        multiline
      />

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Tags</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingField(editingField === 'tags' ? null : 'tags')}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        
        {editingField === 'tags' ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button onClick={addTag} disabled={!newTag.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer group"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3 ml-1 group-hover:text-red-500" />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setEditingField(null)}>
                Save Tags
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setEditingField(null);
                  setData({ ...data, tags: initialData.tags });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.tags.length > 0 ? (
              data.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700"
                >
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400 italic">No tags added yet</span>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};
