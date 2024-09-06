import { Form, Input, Button } from "antd";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { ICreateArticleFormInput } from "../../types/articlesTypes";
import { getToken } from "../../features/token";
import { useCreateArticleMutation } from "../../service/api";

import classes from "./CreateArticle.module.scss";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    resetField,
  } = useForm<ICreateArticleFormInput>({
    mode: "onSubmit",
    defaultValues: {
      tagList: [],
    },
  });

  const [createArticle, { isLoading, isError }] = useCreateArticleMutation();
  const navigate = useNavigate();

  const watchTag = watch("valueTag");

  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
  });

  const onSubmit: SubmitHandler<ICreateArticleFormInput> = async (data) => {
    console.log("onSubmit");
    console.log(data);
    try {
      const tagList = data.tagList.map((tag) => tag.value);
      const token = getToken() as string;
      const result = await createArticle({
        body: {
          article: {
            title: data.title,
            description: data.description,
            body: data.body,
            tagList,
          },
        },
        token,
      }).unwrap();

      if (result) {
        console.log("Create Article success", result);
        navigate("/");
      }
    } catch (err) {
      console.error("Create Article error:", err);
    }
  };

  if (isError) return <h1>Sorry, Something went wrong</h1>;

  return (
    <Form
      className={`${classes.createArticle}`}
      name="createArticle"
      layout="vertical"
      autoComplete="off"
      onFinish={() => {
        void handleSubmit(onSubmit)();
      }}
    >
      <fieldset className={`${classes.createArticleFieldset}`}>
        <legend className={`${classes.createArticleLegend}`}>Create new article</legend>
        <Form.Item
          className={`${classes.createArticleItemInput}`}
          label="Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
            }}
            render={({ field: { name, value, onChange } }) => (
              <Input
                className={`${classes.createArticleInputTitle}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Title"
                aria-invalid={errors.title ? "true" : "false"}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          className={`${classes.createArticleItemInput}`}
          label="Short description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required",
            }}
            render={({ field: { name, value, onChange } }) => (
              <Input
                className={`${classes.createArticleInputDescription}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Title"
                aria-invalid={errors.description ? "true" : "false"}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          className={`${classes.createArticleItemInput}`}
          label="Text"
          validateStatus={errors.body ? "error" : ""}
          help={errors.body?.message}
        >
          <Controller
            name="body"
            control={control}
            rules={{
              required: "Text is required",
            }}
            render={({ field: { name, value, onChange } }) => (
              <Input.TextArea
                className={`${classes.createArticleTextArea}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Text"
                autoSize={{ minRows: 7 }}
                aria-invalid={errors.body ? "true" : "false"}
              />
            )}
          />
        </Form.Item>
        <Form.List name="tagList">
          {() => (
            <Form.Item
              label="Tags"
              validateStatus={errors.valueTag ? "error" : ""}
              help={errors.valueTag?.message}
            >
              {fields.map((field, index) => (
                <Form.Item key={field.id}>
                  <Controller
                    control={control}
                    name={`tagList.${index}`}
                    render={({
                      field: {
                        name,
                        value: { value },
                        onChange,
                      },
                    }) => (
                      <Input
                        className={`${classes.createArticleTag}`}
                        name={`${name}.${index}`}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Button
                    className={`${classes.createArticleBtn} ${classes.createArticleBtnDeleteTag}`}
                    danger
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </Form.Item>
              ))}
              <Controller
                name="valueTag"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Input
                    className={`${classes.createArticleTag}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="Tag"
                    aria-invalid={errors.valueTag ? "true" : "false"}
                  />
                )}
              />
              <Button
                className={`${classes.createArticleBtn} ${classes.createArticleBtnAddTag}`}
                type="primary"
                ghost
                onClick={() => {
                  if (watchTag?.trim()) {
                    append({ value: watchTag });
                    resetField("valueTag");
                  } else {
                    setError("valueTag", {
                      type: "manual",
                      message: "Tag cannot be empty",
                    });
                  }
                }}
              >
                Add tag
              </Button>
            </Form.Item>
          )}
        </Form.List>
        <Form.Item className={`${classes.createArticleActions}`}>
          <Button
            className={`${classes.createArticleBtn} ${classes.createArticleBtnSend}`}
            type="primary"
            htmlType="submit"
            name="send"
            loading={isLoading}
          >
            Send
          </Button>
        </Form.Item>
      </fieldset>
    </Form>
  );
};

export default CreateArticle;
