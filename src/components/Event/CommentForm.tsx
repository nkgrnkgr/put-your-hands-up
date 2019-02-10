import * as React from 'react';
import { Event } from 'domain/Event';
import { Formik, Form, FormikActions, Field } from 'formik';
import NoteContents, {
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
import { getLtId } from 'domain/Lt';
export interface CommentFormProps {
  auth: Auth;
  firestore?: Firestore;
  event: Event;
  inputtingComment: string;
  inputtingTags: Tag[];
  inputtingTagTitle: string;
  isActiveCommentForm: boolean;
  onChangeComment: (comment: string) => void;
  addComment: (comment: string) => void;
  addTag: (tag: Tag) => void;
  removeTag: (index: number) => void;
  onChangeTagTitle: (title: string) => void;
  resetCommentInfo: () => void;
  changeStateCommentForm: (shouldClose: boolean) => void;
  selectedTabIndex: number;
}

interface CommentFormValues extends Note {}

const commentForm: React.SFC<CommentFormProps> = ({
  auth,
  firestore,
  event,
  inputtingComment,
  inputtingTags,
  inputtingTagTitle,
  isActiveCommentForm,
  onChangeComment,
  addComment,
  addTag,
  removeTag,
  onChangeTagTitle,
  resetCommentInfo,
  changeStateCommentForm,
  selectedTabIndex
}) => {
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

  const initialValues: CommentFormValues = {
    id: createRandomId(),
    user: userInfo(auth),
    noteContents: INITIAL_VALUE,
    ltId: '',
    eventId: event.id
  };

  const close = () => {
    changeStateCommentForm(false);
  };

  const reset = () => {
    resetCommentInfo();
  };

  const handleOnForcus = () => {
    changeStateCommentForm(true);
  };

  const handleOnSubmit = (values: CommentFormValues) => {
    const user = userInfo(auth);
    if (user) {
      if (firestore && firestore.set) {
        firestore.set(
          { collection: 'notes', doc: values.id },
          {
            user,
            noteContents: mergeNoteComments(values),
            eventId: values.eventId,
            ltId: getLtId(selectedTabIndex, event)
          }
        );
        close();
      }
    }
  };

  const mergeNoteComments = (values: CommentFormValues): NoteContents => {
    const tagTitles: string[] = [];
    inputtingTags.map(tag => tagTitles.push(tag.title));
    return {
      ...values.noteContents,
      tagTitles,
      comment: inputtingComment,
      createUserId: auth.uid
    };
  };

  return (
    <div>
      <div className="card">
        <Formik
          initialValues={initialValues}
          onSubmit={(
            values: CommentFormValues,
            { setSubmitting }: FormikActions<CommentFormValues>
          ) => {
            handleOnSubmit(values);
          }}
          render={({ values, setFieldValue }) => {
            const handleOnSwatchHover = (hex: string) => {
              setFieldValue('noteContents.color', hex);
            };

            return (
              <div className="box" style={{ padding: '1rem' }}>
                <div className="media-content">
                  <Form>
                    <article className="media">
                      <figure className="media-left">
                        <p className="image is-32x32">
                          <img
                            className="is-rounded"
                            src={userInfo(auth).photoURL}
                          />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <div
                            className="field"
                            style={{ marginBottom: '0px' }}
                          >
                            <textarea
                              className="textarea"
                              rows={isActiveCommentForm ? 3 : 1}
                              onChange={e => handleOnChangeComment(e)}
                              placeholder="コメントを入力..."
                              value={inputtingComment}
                              onFocus={e => handleOnForcus()}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                    <div
                      style={{
                        display: `${isActiveCommentForm ? 'block' : 'none'}`
                      }}
                    >
                      <div />
                      <div className="field is-grouped is-grouped-right">
                        <label className="label">
                          {`${inputtingComment.length}`}
                        </label>
                      </div>
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
                        <label className="label">Tag</label>
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
                            onClick={e =>
                              handleOnClickAddTag(inputtingTagTitle)
                            }
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
                      <div className="field">
                        <div className="field">
                          <label className="label">BackGround Color</label>
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
                      <hr />
                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            className="button is-rounded is-danger shadow"
                            type="submit"
                          >
                            <span className="icon is-small">
                              <i className="fas fa-comments" />
                            </span>
                            <span>POST</span>
                          </button>
                        </div>
                        <div className="control">
                          <a onClick={e => reset()} className="button is-white">
                            RESET
                          </a>
                        </div>
                        <div className="control">
                          <a onClick={e => close()} className="button is-white">
                            CLOSE
                          </a>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            );
          }}
        />
      </div>

      <hr />
    </div>
  );
};

export default commentForm;
