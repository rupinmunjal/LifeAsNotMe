import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingTransitionProps {
  isLoading?: boolean;
  message?: string;
}

const LoadingTransition = ({
  isLoading = true,
  message = "Generating your perspective videos...",
}: LoadingTransitionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { perspective } = location.state || {}; // Extract perspective from state

  useEffect(() => {
    // Simulate loading time (3 seconds) then redirect to results
    const timer = setTimeout(() => {
      navigate("/results", { state: { perspective } });
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate, perspective]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center space-y-6 text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl" />
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {message}
          </h2>
          <p className="text-muted-foreground">
            Please wait while we create your unique perspective experience
          </p>
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingTransition;
