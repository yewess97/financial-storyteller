import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/ui/Button";
import Icon from "components/AppIcon";

const UnderWorking = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">503</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">
          Service Temporarily Unavailable
        </h2>

        <p className="text-onBackground/70 mb-8">
          We're currently performing some upgrades.  
          Please check back shortly — everything will be back online soon!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            icon={<Icon name="RotateCcw" />}
            iconPosition="left"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>

          <Button
            variant="outline"
            icon={<Icon name="Home" />}
            iconPosition="left"
            onClick={handleGoHome}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnderWorking;
