import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"; // Replace with your Card component import

const InsideCognizant = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    cultureText: "Culture description here.",
    cultureImgs: [
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
    ],
    peopleText: "People description here.",
    peopleImgs: [
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
    ],
    workplaceText: "Workplace description here.",
    workplaceImgs: [
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e, field, index) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const updatedImgs = [...formData[field]];
    updatedImgs[index] = imageUrl;
    setFormData({ ...formData, [field]: updatedImgs });
  };

  const handleUpdate = () => {
    setIsEditing(false);
    // Make an API call to save the updated text and images.
    console.log("Updated Data: ", formData);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="inside-cognizant">
      <div className="auto-container w-[90%]">
        <div className="sec-title text-center">
          <p className="font-bold text-xl sm:text-3xl text-black">Inside Cognizant</p>
        </div>

        <button onClick={toggleEdit} className="text-white bg-violet-950 border p-2 rounded-lg px-4 ">
          {isEditing ? "Cancel" : "Edit"}
        </button>

        <Tabs defaultValue="culture" className="w-full flex flex-col justify-center align-middle">
          <div className="w-full flex justify-center">
            <TabsList className="grid w-[600px] grid-cols-3 bg-none">
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="workplace">Workplace</TabsTrigger>
            </TabsList>
          </div>

          {/* Culture Tab */}
          <TabsContent value="culture">
          {!isEditing ? (
             <Card className="w-full grid grid-cols-2 gap-2">
                <div>
               <img src={formData.cultureImgs[2]} alt="Culture 3" className="object-cover w-full " />
             </div>
             <div className="grid grid-rows-2 gap-2">
               <img src={formData.cultureImgs[0]} alt="Culture 1" className=" w-full h-[250px] " />
               <img src={formData.cultureImgs[1]} alt="Culture 2" className=" w-full h-[250px]" />
             </div>
           
            
           </Card>
            ) : (
              <div className="w-full flex flex-col gap-4 mt-4 border p-4 bg-violet-200 rounded-lg">
              
                <div className="flex justify-around ">
                  {formData.cultureImgs.map((img, index) => (
                    <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg bg-white">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "cultureImgs", index)}
                        className="mt-1 block w-full"
                      />
                      <div className="w-[300px] h-[200px] mt-4">
                        <img src={img} alt={`Culture Preview ${index}`} className="object-cover w-full h-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* People Tab */}
          <TabsContent value="people">
            {!isEditing ? (
             
              <Card className="w-full grid grid-cols-2 gap-2">
              <div>
             <img src={formData.peopleImgs[2]} alt="Culture 3" className="object-cover w-full " />
           </div>
           <div className="grid grid-rows-2 gap-2">
             <img src={formData.peopleImgs[0]} alt="Culture 1" className=" w-full h-[250px] " />
             <img src={formData.peopleImgs[1]} alt="Culture 2" className=" w-full h-[250px]" />
           </div>
         
          
         </Card>
            ) : (
                <div className="w-full flex flex-col gap-4 mt-4 border p-4 bg-green-200 rounded-lg">
                

                <div className="flex justify-around ">
                  {formData.peopleImgs.map((img, index) => (
                             <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg bg-white">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "peopleImgs", index)}
                        className="mt-1 block w-full"
                      />
                      <div className="w-[300px] h-[200px] mt-4">
                        <img src={img} alt={`People Preview ${index}`} className="object-cover w-full h-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Workplace Tab */}
          <TabsContent value="workplace">
            {!isEditing ? (
              

<Card className="w-full grid grid-cols-2 gap-2">
<div>
<img src={formData.workplaceImgs[2]} alt="Culture 3" className="object-cover w-full " />
</div>
<div className="grid grid-rows-2 gap-2">
<img src={formData.workplaceImgs[0]} alt="Culture 1" className=" w-full h-[250px] " />
<img src={formData.workplaceImgs[1]} alt="Culture 2" className=" w-full h-[250px]" />
</div>


</Card>
            ) : (
                <div className="w-full flex flex-col gap-4 mt-4 border p-4 bg-red-200 rounded-lg">
                
                <div className="flex justify-around ">
                  {formData.workplaceImgs.map((img, index) => (
                   <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg bg-white">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "workplaceImgs", index)}
                        className="mt-1 block w-full"
                      />
                      <div className="w-[300px] h-[200px] mt-4">
                        <img src={img} alt={`Workplace Preview ${index}`} className="object-cover w-full h-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Update Button */}
        {isEditing && (
          <button
            onClick={handleUpdate}
            className="mt-6 px-4 py-2 bg-violet-900 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        )}
      </div>
    </section>
  );
};

export default InsideCognizant;
