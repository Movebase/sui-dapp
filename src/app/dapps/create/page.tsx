"use client";
import React, { forwardRef, useState } from "react";
import { Autocomplete, Box, Button, TextField, styled } from "@mui/material";
import { Create, FileField, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller } from "react-hook-form";
import { uploadDappIcon } from "../../../providers/api/dappStore";
import { useParsed } from "@refinedev/core";

const CreateApp = () => {
  const [image, setImage] = useState<any>();
  const previewImage = image && URL.createObjectURL(image);
  const {
    saveButtonProps,
    refineCore: { onFinish, formLoading, queryResult, redirect },
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      meta: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      },
      redirect: false,
      onMutationSuccess: async (data: any, variables, context, isAutoSave) => {
        const formData = new FormData();

        if (image) {
          formData.append("image", image);
          const res = await uploadDappIcon(data?.data.id, formData).then(
            (res) => {
              redirect("list");
            }
          );
        }
      },
    },
  });
  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  const handleSubmitForm = async (values: any) => {
    delete values.appIcon;
    onFinish(values);
  };
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
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
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"App name"}
          name="name"
        />
        <TextField
          {...register("shortDescription", {
            // required: "This field is required",
          })}
          error={!!(errors as any)?.shortDescription}
          helperText={(errors as any)?.shortDescription?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Short description"}
          name="shortDescription"
        />
        <TextField
          {...register("description", {
            // required: "This field is required",
          })}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Description"}
          name="description"
        />
        <TextField
          {...register("url", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.url}
          helperText={(errors as any)?.url?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Url"}
          name="url"
        />
        <Controller
          control={control}
          name={"category.id"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              options={categoryAutocompleteProps?.options ?? []}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Category"}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.category?.id}
                  helperText={(errors as any)?.category?.id?.message}
                  required
                />
              )}
            />
          )}
        />
        {/* <Controller
          control={control}
          name={"category.id"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              options={usersAutocompleteProps?.options ?? []}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id);
                setCategory(value);
              }}
              value={category}
              getOptionLabel={(item) => {
                return (
                  usersAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"User"}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.user?.id}
                  helperText={(errors as any)?.user?.id?.message}
                  required
                />
              )}
            />
          )}
        /> */}
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
                      // required: "This field is required",
                    })}
                    onChange={handleChange}
                  />
                </Button>
              </>
            );
          }}
        />
        <img src={previewImage} alt="app-logo" width={80} height={80} />
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
