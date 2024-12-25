import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';

const InsideCompany = ({ companyName, token }) => {
  const [activeTab, setActiveTab] = useState('culture');
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageData, setImageData] = useState({
    culture: Array(3).fill(null),
    people: Array(3).fill(null),
    workplace: Array(3).fill(null),
  });

  const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
  const BASEIMAGEURL = "https://api.sentryspot.co.uk";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${BASEURL}/company`, {
        headers: { Authorization: token }
      });
      const data = response.data?.data || {};
      setImageData({
        culture: data.inside_culture_images || Array(3).fill(null),
        people: data.inside_people_images || Array(3).fill(null),
        workplace: data.inside_workplace_images || Array(3).fill(null),
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images. Please try again.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(`inside_${activeTab}_images_upload`, file);
    formData.append("image_indexes", selectedImageIndex?.toString() || "");

    try {
      const response = await axios.patch(
        `${BASEURL}/company-inside-${activeTab}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.data.image_url) {
        setImageData(prev => ({
          ...prev,
          [activeTab]: prev[activeTab].map((url, index) =>
            index === selectedImageIndex ? `${BASEIMAGEURL}${response.data.image_url}` : url
          )
        }));
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }

    setShowModal(false);
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const getImageUrl = (tab, index) => {
    return imageData[tab][index] || '/placeholder.svg';
  };

  return (
    <div className="inside-company w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Inside {companyName}</h2>

      <Tabs defaultValue="culture" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="workplace">Workplace</TabsTrigger>
        </TabsList>

        {['culture', 'people', 'workplace'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="relative">
                      <img 
                        src={getImageUrl(tab, 2)} 
                        alt={`${tab} 3`} 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => openImageModal(2)}
                        className="absolute top-2 right-2"
                        variant="secondary"
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                  {[0, 1].map((index) => (
                    <div key={index} className="relative">
                      <img 
                        src={getImageUrl(tab, index)} 
                        alt={`${tab} ${index + 1}`} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => openImageModal(index)}
                        className="absolute top-2 right-2"
                        variant="secondary"
                      >
                        Change Image
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Image</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

InsideCompany.propTypes = {
  companyName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default InsideCompany;

