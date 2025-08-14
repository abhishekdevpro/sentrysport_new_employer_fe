import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export default function CompanyCard({ children, className = "", showEditButton = true,query="" }) {
  const navigate = useNavigate();

  return (
    <div
      className={`app-light-bg rounded-2xl shadow-lg p-8 md:p-12 border border-blue-100 transition-all hover:shadow-xl ${className} relative`}
    >
      {showEditButton && (
        <Button
          onClick={() => navigate(`/employers-dashboard/company-profile?edit=${query}`)}
          className="absolute top-4 right-4 "
        >
          <Edit size={20} />
        
        </Button>
      )}
      {children}
    </div>
  );
}
