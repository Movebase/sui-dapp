"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { forwardRef, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { apiUrl } from "../../../providers/api";
import {
  uploadDappIcon,
  uploadDappScreenshots,
} from "../../../providers/api/dappStore";
import { XmarkCircle } from "iconoir-react";
interface FormProps {
  Component: any;
  imageNotRequired?: boolean;
}
const Form = ({ Component, imageNotRequired = false }: FormProps) => {
  const [image, setImage] = useState<any>();
  const [screenshots, setScreenshots] = useState<any>();

  const {
    saveButtonProps,
    refineCore: { queryResult, onFinish, formLoading, redirect },
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
          await uploadDappIcon(data?.data.id, formData).then((res) => {
            redirect("list");
          });
        }
        redirect("list");
        if (screenshots.length > 0) {
          screenshots.map((item: any, index: number) => {
            formData.append(`screenshot_${index + 1}`, item);
          });
          await uploadDappScreenshots(data?.data.id, formData).then((res) => {
            redirect("list");
          });
        }
      },
    },
  });

  const iconSource = queryResult?.data?.data?.icon;
  // const screenshotsSource = queryResult?.data?.data?.screenshots;
  const defaultImage = `${apiUrl}/storage/dapps${iconSource}`;
  const previewImage = image && URL.createObjectURL(image);
  // const previewScreenshot =
  //   screenshots?.length > 0 &&
  //   screenshots?.map((item: any) => URL.createObjectURL(item));

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  const handleSubmitForm = async (values: any) => {
    onFinish(values);
  };
  const handleChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <Component
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
        <Controller
          control={control}
          name="appIcon"
          rules={imageNotRequired ? {} : { required: "This field is required" }}
          render={({ field }) => {
            return (
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
                  accept=".png, .jpg, .jpeg"
                  name="url"
                  onChange={(e) => {
                    handleChange(e);
                    // field.onChange(e);
                  }}
                />
              </Button>
            );
          }}
        />
        {errors?.appIcon && (
          <Typography className="ml-[14px] py-1 text-[12px] text-error-main">
            {(errors as any)?.appIcon?.message}
          </Typography>
        )}
        {image && (
          <img
            src={previewImage}
            alt="app-logo"
            width={80}
            height={80}
            className="pt-4"
          />
        )}
        {!image && iconSource && (
          <img
            src={defaultImage}
            alt="app-logo"
            width={80}
            height={80}
            className="pt-4"
          />
        )}
        {/* <Controller
          control={control}
          name="screenshots"
          rules={imageNotRequired ? {} : { required: "This field is required" }}
          render={({ field }) => {
            return (
              <Button
                role={undefined}
                variant="contained"
                className="w-1/4"
                component={LabelRef}
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload screenshot
                <VisuallyHiddenInput
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="url"
                  multiple
                  max={5}
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setScreenshots(files);
                  }}
                />
              </Button>
            );
          }}
        />
        {errors?.screenshots && (
          <Typography className="ml-[14px] py-1 text-[12px] text-error-main">
            {(errors as any)?.screenshots?.message}
          </Typography>
        )}
        <div className="flex gap-2">
          {screenshots &&
            previewScreenshot.map((screenshot: any, index: number) => {
              return (
                <div key={screenshot} className="relative">
                  <img
                    src={screenshot}
                    alt="app-logo"
                    width={100}
                    height={100}
                    className="object-contain pt-4 "
                  />
                  <XmarkCircle
                    className="absolute right-1 top-2 h-5 w-5 rounded-full bg-primary-contrastText  hover:cursor-pointer hover:text-error-main"
                    onClick={() => {
                      const newScreenshots = [...screenshots];
                      newScreenshots.splice(index, 1);
                      setScreenshots(newScreenshots);
                    }}
                  />
                </div>
              );
            })}
        </div> */}
        {/* {!image && iconSource && (
          <img
            src={defaultImage}
            alt="app-logo"
            width={80}
            height={80}
            className="pt-4"
          />
        )} */}
      </Box>
    </Component>
  );
};

export default Form;

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
