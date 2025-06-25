import { Constant } from "@/utils/constant/constant";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const FilterSidebar = () => {
    const token = localStorage.getItem(Constant.USER_TOKEN);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    // Render user name safely
    const renderUserName = () => {
        if (!userInfo) return "User";
        return `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim();
    };

    // Render profile image with fallback
    const renderProfileImage = (defaultSrc) => {
        return userInfo?.photo ? `https://api.sentryspot.co.uk${userInfo.photo}` : defaultSrc;
    };

    return (
        <div className="pd-right">
            {/* User Profile Section */}
            {token && userInfo && (
                <div className="filters-outer text-center">
                    <div className="flex justify-center">
                        <img 
                            src={renderProfileImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s")}
                            className="rounded-full w-auto h-20"
                            alt="Profile" 
                        />
                    </div>
                    <h4 className="m-3">{renderUserName()}</h4>
                    <Button onClick={() => navigate('/showcase/org')} className="w-full" variant="link" >
                    View 
                </Button>
                </div>
            )}

            {/* Spot Jobs Section */}
            <div className="filters-outer text-center">
                <div className="flex justify-center">
                    <img 
                        src="https://w7.pngwing.com/pngs/352/661/png-transparent-flowers-bouquet-watercolor-flowers-flower-clip-art-thumbnail.png"
                        className="rounded-full w-aut0 h-20"
                        alt="Spot Jobs" 
                    />
                </div>
                <h6 className="m-3">SPOT JOBS</h6>
                <p className="text-xs my-2">
                    Discover and apply to jobs that align with your skills, interests, and professional goals.
                </p>
              
                   <Button
                    onClick={()=>(window.location.href="https://sentryspot.co.uk/job-list-v3")}
                   variant="default" className="w-full" >Explore</Button>
                
            </div>

            {/* Spot Companies Section */}
            <div className="filters-outer text-center">
                <div className="flex justify-center">
                    <img 
                        src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
                        className="rounded-full w-auto h-20"
                        alt="Companies" 
                    />
                </div>
                <h6 className="m-3">SPOT COMPANIES</h6>
                <p className="text-xs my-2">
                    Explore and connect with verified companies that match your career aspirations and values.
                </p>
                
                <Button onClick={()=>(window.location.href = "https://sentryspot.co.uk/companies-list")} variant="default" className="w-full">Explore</Button>
                
            </div>
        </div>
    );
};

export default FilterSidebar;
