import * as React from 'react';
import { Event } from 'domain/Event';
import { Formik, Form, FormikActions, Field } from 'formik';
import {
  FEATURED_CONTENTS,
  INITIAL_VALUE,
  FEATURED_TAGS,
  COLORS
} from 'domain/NoteContents';
import { Note } from 'domain/Note';
import { createRandomId } from 'utils/Id';
import userInfo from 'lib/userInfo';
import Tag from 'domain/Tag';
import TagLink from 'components/TagLink';
import { CirclePicker } from 'react-color';
export interface CommentFormProps {
  auth: Auth;
  event: Event;
  inputtingComment: string;
  inputtingTags: Tag[];
  inputtingTagTitle: string;
  onChangeComment: (comment: string) => void;
  addComment: (comment: string) => void;
  addTag: (tag: Tag) => void;
  removeTag: (index: number) => void;
  onChangeTagTitle: (title: string) => void;
}

interface CommentFormValues extends Note {}

const commentForm: React.SFC<CommentFormProps> = ({
  auth,
  event,
  inputtingComment,
  inputtingTags,
  inputtingTagTitle,
  onChangeComment,
  addComment,
  addTag,
  removeTag,
  onChangeTagTitle
}) => {
  const initialValues: CommentFormValues = {
    id: createRandomId(),
    user: userInfo(auth),
    noteContents: INITIAL_VALUE,
    ltId: '',
    eventId: event.id
  };

  const handleOnChangeComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    onChangeComment(e.currentTarget.value);
  };

  const handleAddComment = (featuredComment: string) => {
    addComment(featuredComment);
  };

  const handleOnClickAddTag = (inputtingTagTitle: string) => {
    addTag({ title: inputtingTagTitle, isFeatured: false });
  };

  const handleOnChangeTagTitle = (e: React.FormEvent<HTMLInputElement>) => {
    onChangeTagTitle(e.currentTarget.value);
  };

  const handleOnClickFeaturedTagButton = (title: string) => {
    addTag({ title, isFeatured: false });
  };

  return (
    <div className="card">
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: CommentFormValues,
          { setSubmitting }: FormikActions<CommentFormValues>
        ) => {
          // submint 処理の記述
          console.log(values);
        }}
        render={({ values, setFieldValue }) => {
          const handleOnSwatchHover = (hex: string) => {
            setFieldValue('noteContents.color', hex);
          };

          return (
            <div className="card-content">
              <div className="content">
                <Form>
                  <div className="field">
                    <textarea
                      className="textarea"
                      rows={3}
                      onChange={e => handleOnChangeComment(e)}
                      placeholder="コメントを入力..."
                      value={inputtingComment}
                    />
                  </div>
                  <label className="label">
                    {`文字数 : ${inputtingComment.length}`}
                  </label>
                  <div className="field is-grouped is-grouped-multiline">
                    {FEATURED_CONTENTS.map((content, index) => (
                      <p key={index} className="control">
                        <a
                          className="button is-small"
                          onClick={e => handleAddComment(content)}
                        >
                          <span>{content}</span>
                        </a>
                      </p>
                    ))}
                  </div>
                  <div className="field">
                    <label className="label">タグ</label>
                  </div>
                  <div className="field is-grouped is-grouped-multiline">
                    {FEATURED_TAGS.map((t, index) => (
                      <p key={index} className="control">
                        <a
                          className="button is-small"
                          onClick={e => handleOnClickFeaturedTagButton(t)}
                        >
                          <span>{t}</span>
                        </a>
                      </p>
                    ))}
                  </div>
                  <div className="field has-addons">
                    <div className="control has-icons-left">
                      <input
                        className="input is-small"
                        name="tmp_tab"
                        placeholder=""
                        type="text"
                        value={inputtingTagTitle}
                        onChange={e => handleOnChangeTagTitle(e)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-tags" />
                      </span>
                    </div>
                    <div className="control">
                      <a
                        className="button is-info is-small"
                        onClick={e => handleOnClickAddTag(inputtingTagTitle)}
                      >
                        Add
                      </a>
                    </div>
                  </div>
                  <div className="field is-grouped is-grouped-multiline">
                    {inputtingTags.map((tag, index) => (
                      <TagLink
                        key={index}
                        index={index}
                        tagTitle={tag.title}
                        size="is-medium"
                        handleDelete={removeTag}
                      />
                    ))}
                  </div>
                  {/* <Field name="color" style={{ display: 'none' }} /> */}
                  <div className="field">
                    <div className="field">
                      <label className="label">背景色</label>
                    </div>
                    <Field
                      name="color"
                      render={() => {
                        return (
                          <CirclePicker
                            colors={COLORS}
                            onSwatchHover={colorResult =>
                              handleOnSwatchHover(colorResult.hex)
                            }
                          />
                        );
                      }}
                    />
                  </div>
                  <button type="submit" className="button">
                    送信
                  </button>
                </Form>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default commentForm;
