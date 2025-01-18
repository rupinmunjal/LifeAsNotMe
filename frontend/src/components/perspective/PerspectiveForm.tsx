import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PerspectiveFormProps {
  onSubmit?: (perspective: string) => void;
  isLoading?: boolean;
}

const PerspectiveForm = ({
  onSubmit = () => {},
  isLoading = false,
}: PerspectiveFormProps) => {
  const [perspective, setPerspective] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (perspective.trim()) {
      onSubmit(perspective);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-[650px] p-8 bg-card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              See Through New Eyes
            </h1>
            <p className="text-muted-foreground">
              Enter whose perspective you want to see the world from
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="e.g. a cat, a tree, a cloud..."
                value={perspective}
                onChange={(e) => setPerspective(e.target.value)}
                className="h-12 text-lg"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={!perspective.trim() || isLoading}
              >
                <Eye className="mr-2 h-5 w-5" />
                See Through Their Eyes
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Try these perspectives:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "a curious cat",
                  "an ancient tree",
                  "a floating cloud",
                  "a busy bee",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setPerspective(suggestion)}
                    disabled={isLoading}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </motion.div>
      </Card>
    </div>
  );
};

export default PerspectiveForm;
