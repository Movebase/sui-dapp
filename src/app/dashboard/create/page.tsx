"use client";
import React, { forwardRef, useState } from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import { Create, FileField } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller } from "react-hook-form";

const CreateApp = () => {
  const {
    saveButtonProps,
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const [file, setFile] = useState<any>();

  const handleSubmitForm = (values: any) => {
    // onFinish({
    //   fullName: `${values.name} ${values.surname}`,
    // });
  };
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };
  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(handleSubmitForm),
      }}
    >
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          {...register("appName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"App name"}
          name="appName"
        />
        <TextField
          {...register("shortDescription", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Short description"}
          name="shortDescription"
        />{" "}
        <TextField
          {...register("description", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Description"}
          name="description"
        />
        <Controller
          control={control}
          name="appIcon"
          render={() => {
            return (
              <>
                <Button
                  role={undefined}
                  variant="contained"
                  className="w-1/4"
                  component={LabelRef}
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    {...register("appIcon", {
                      required: "This field is required",
                    })}
                    onChange={handleChange}
                  />
                </Button>
              </>
            );
          }}
        />
        <img src={file} alt="" />
      </Box>
    </Create>
  );
};

export default CreateApp;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// eslint-disable-next-line react/display-name
const LabelRef = forwardRef<any, any>((props, ref) => (
  <label innerRef={ref} {...props}>
    {props.children}
  </label>
));
