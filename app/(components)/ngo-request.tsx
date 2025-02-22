"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";

function NgoReq() {
  const { user } = useUser();
  const userId = user?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isRegistered = useQuery(
    api.document.isNgoRegistered,
    userId ? { userId } : null
  );
  const createRequest = useMutation(api.document.createHelpRequest);
  const registerNgo = useMutation(api.document.registerNgo);

  const [requestData, setRequestData] = useState({
    title: "",
    description: "",
    type: "FOOD",
    amount: 0,
    location: {
      address: "",
      city: "",
      state: "",
      latitude: 0,
      longitude: 0,
    },
    urgencyLevel: "MEDIUM",
  });

  const [ngoData, setNgoData] = useState({
    name: "",
    description: "",
    registrationNumber: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (name, value) => {
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNgoChange = (e) => {
    const { name, value } = e.target;
    setNgoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNgoAddressChange = (e) => {
    const { name, value } = e.target;
    setNgoData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!userId) {
        throw new Error("User ID not found. Please log in.");
      }

      await createRequest({
        ...requestData,
        amount:
          requestData.type === "FINANCIAL"
            ? Number(requestData.amount)
            : undefined,
      });

      setIsSubmitting(false);
      toast.success("Help request created successfully");
      // Reset form
      setRequestData({
        title: "",
        description: "",
        type: "FOOD",
        amount: 0,
        location: {
          address: "",
          city: "",
          state: "",
          latitude: 0,
          longitude: 0,
        },
        urgencyLevel: "MEDIUM",
      });
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
      toast.error("Failed to create help request");
    }
  };

  const handleRegisterNgo = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!userId) {
        throw new Error("User ID not found. Please log in.");
      }

      await registerNgo({
        userId,
        ...ngoData,
      });

      setIsSubmitting(false);
      toast.success("NGO registered successfully");
      // Reset form
      setNgoData({
        name: "",
        description: "",
        registrationNumber: "",
        email: "",
        phone: "",
        website: "",
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          latitude: 0,
          longitude: 0,
        },
      });
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
      toast.error("Failed to register NGO");
    }
  };

  if (!userId) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please log in to create a help request.
        </AlertDescription>
      </Alert>
    );
  }

  if (isRegistered === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div className="max-w-2xl mx-auto p-4 w-[100vw] space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Register Your NGO</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterNgo} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">NGO Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={ngoData.name}
                    onChange={handleNgoChange}
                    required
                    placeholder="Enter NGO name"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={ngoData.description}
                    onChange={handleNgoChange}
                    required
                    placeholder="Brief description of your NGO"
                  />
                </div>

                <div>
                  <Label htmlFor="registrationNumber">
                    Registration Number
                  </Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={ngoData.registrationNumber}
                    onChange={handleNgoChange}
                    required
                    placeholder="Enter registration number"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={ngoData.email}
                    onChange={handleNgoChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={ngoData.phone}
                    onChange={handleNgoChange}
                    required
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={ngoData.website}
                    onChange={handleNgoChange}
                    placeholder="Enter website URL"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Address Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="street">Street</Label>
                      <Input
                        id="street"
                        name="street"
                        value={ngoData.address.street}
                        onChange={handleNgoAddressChange}
                        required
                        placeholder="Enter street address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={ngoData.address.city}
                        onChange={handleNgoAddressChange}
                        required
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={ngoData.address.state}
                        onChange={handleNgoAddressChange}
                        required
                        placeholder="Enter state"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={ngoData.address.country}
                        onChange={handleNgoAddressChange}
                        required
                        placeholder="Enter country"
                      />
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={ngoData.address.postalCode}
                        onChange={handleNgoAddressChange}
                        required
                        placeholder="Enter postal code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering NGO...
                  </>
                ) : (
                  "Register NGO"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 w-[100vw] space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Help Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Request Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={requestData.title}
                  onChange={handleChange}
                  required
                  placeholder="Brief title for your request"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={requestData.description}
                  onChange={handleChange}
                  required
                  placeholder="Detailed description of the help needed"
                />
              </div>

              <div>
                <Label htmlFor="type">Request Type</Label>
                <Select
                  value={requestData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FOOD">Food</SelectItem>
                    <SelectItem value="FINANCIAL">Financial</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {requestData.type === "FINANCIAL" && (
                <div>
                  <Label htmlFor="amount">Amount Needed</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={requestData.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="urgencyLevel">Urgency Level</Label>
                <Select
                  value={requestData.urgencyLevel}
                  onValueChange={(value) =>
                    handleSelectChange("urgencyLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={requestData.location.address}
                      onChange={handleLocationChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={requestData.location.city}
                      onChange={handleLocationChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={requestData.location.state}
                      onChange={handleLocationChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Request...
                </>
              ) : (
                "Create Help Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NgoReq;
