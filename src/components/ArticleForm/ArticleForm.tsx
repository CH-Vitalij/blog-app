import { Form, Input, Button } from "antd";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IArticleFormInput } from "../../types/articlesTypes";
import { getToken } from "../../features/token";
import {
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetArticleQuery,
} from "../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { FC } from "react";

import classes from "./ArticleForm.module.scss";
import { skipToken } from "@reduxjs/toolkit/query/react";

interface ArticleFormProps {
  type?: string;
  legend?: string;
}

const ArticleForm: FC<ArticleFormProps> = ({ type = "create", legend = "" }) => {
  const token = getToken() as string;
  const { slug } = useParams();

  const { title, description, body, tagList } = useGetArticleQuery(
    type === "edit" ? { slug: slug ?? "", token } : skipToken,
    {
      selectFromResult: ({ data }) => ({
        title: data?.article.title,
        description: data?.article.description,
        body: data?.article.body,
        tagList: data?.article.tagList,
      }),
    },
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    resetField,
  } = useForm<IArticleFormInput>({
    mode: "onSubmit",
    defaultValues: {
      title,
      description,
      body,
      tagList: tagList ? tagList.map((tag) => ({ tag })) : [],
    },
  });

  const [createArticle, { isLoading: isLoadingCreateArticle, isError: isErrorCreateArticle }] =
    useCreateArticleMutation();

  const [editArticle, { isLoading: isLoadingEditArticle, isError: isErrorEditArticle }] =
    useEditArticleMutation();

  const navigate = useNavigate();

  const watchTag = watch("newTag");

  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
  });

  const onSubmit: SubmitHandler<IArticleFormInput> = async (formData) => {
    try {
      const tagList = formData.tagList.map((item) => item.tag);

      if (type === "create") {
        const result = await createArticle({
          body: {
            article: {
              title: formData.title,
              description: formData.description,
              body: formData.body,
              tagList,
            },
          },
          token,
        }).unwrap();

        if (result) {
          navigate("/");
        }
      } else if (type === "edit") {
        const result2 = await editArticle({
          body: {
            article: {
              title: formData.title,
              description: formData.description,
              body: formData.body,
              tagList,
            },
          },
          slug: slug ?? "",
          token,
        }).unwrap();

        if (result2) {
          navigate(-1);
        }
      }
    } catch (err) {
      console.error("Create Article error:", err);
    }
  };

  if (isErrorCreateArticle || isErrorEditArticle) return <h1>Sorry, Something went wrong</h1>;

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
        <legend className={`${classes.createArticleLegend}`}>{legend}</legend>
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
        <Form.Item
          label="Tags"
          validateStatus={errors.newTag ? "error" : ""}
          help={errors.newTag?.message}
        >
          {fields.map((field, index) => (
            <Form.Item key={field.id}>
              <Controller
                control={control}
                name={`tagList.${index}.tag`}
                render={({ field: { name, value, onChange } }) => (
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
            name="newTag"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Input
                className={`${classes.createArticleTag}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Tag"
                aria-invalid={errors.newTag ? "true" : "false"}
              />
            )}
          />
          <Button
            className={`${classes.createArticleBtn} ${classes.createArticleBtnAddTag}`}
            type="primary"
            ghost
            onClick={() => {
              if (watchTag?.trim()) {
                append({ tag: watchTag });
                resetField("newTag");
              } else {
                setError("newTag", {
                  type: "manual",
                  message: "Tag cannot be empty",
                });
              }
            }}
          >
            Add tag
          </Button>
        </Form.Item>

        <Form.Item className={`${classes.createArticleActions}`}>
          <Button
            className={`${classes.createArticleBtn} ${classes.createArticleBtnSend}`}
            type="primary"
            htmlType="submit"
            name="send"
            loading={isLoadingCreateArticle || isLoadingEditArticle}
          >
            Send
          </Button>
        </Form.Item>
      </fieldset>
    </Form>
  );
};

export default ArticleForm;
