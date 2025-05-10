import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateEnrollMutation } from "@/features/api/enrollApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const EnrollCourseButton = ({ courseId }) => {
  const [createEnroll, {data, isLoading, isSuccess, isError, error }] =
  useCreateEnrollMutation();

  const enrollCourseHandler  = async () => {
    await createEnroll(courseId);
  };

  useEffect(()=>{
    if(isSuccess){
       if(data?.url){
        window.location.href = data.url; // Redirect to stripe checkout url
       }else{
        toast.error("Invalid response from server.")
       }
    } 
    if(isError){
      toast.error(error?.data?.message || "Failed to enroll session")
    }
  },[data, isSuccess, isError, error])

  return (
    <Button
      disabled={isLoading}
      onClick={enrollCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Enroll Course"
      )}
    </Button>
  );
};

export default EnrollCourseButton;
