import * as React from 'react';
import { InjectedFormProps } from 'redux-form';
import { showResult } from 'api/bizApi';
import TagLink from 'components/TagLink';
import Tag from 'domain/Tag';
import { CirclePicker, Color } from 'react-color';

const featuredContents = [
  '登壇お疲れさまでした👏',
  '完全に理解した🤯',
  '勉強になった✍',
  'クソコードオブザイヤーだ🤮',
  'お強い...💪'
];

const featuredTags = ['初心者', 'マサカリ', 'オーガナイザー', 'お願い'];

export interface InputFormProps {
  onChangeTagInput: (inputtingTag: string) => void;
  addTag: (title: string, isFeatured: boolean) => void;
  removeTag: (index: number) => void;
  inputtingTag: string;
  tags: Tag[];
  onChangeColor: (color: Color) => void;
  selectedColor: Color;
  inputtingContent: string;
  onChangeContent: (inputtingContent: string) => void;
}

type InputType = InputFormProps & InjectedFormProps;

const inputForm: React.SFC<InputType> = ({
  onChangeTagInput = () => {},
  addTag = () => {},
  removeTag = () => {},
  inputtingTag = '',
  tags = [],
  onChangeColor = () => {},
  selectedColor = '#F4F4F4',
  inputtingContent = '',
  onChangeContent = () => {},
  handleSubmit,
  submitting
}) => (
  <form onSubmit={handleSubmit(showResult)}>
    <div className="modal is-active">
      <div className="modal-background" />>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">投稿する</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">内容</label>
            <div className="control">
              {/* <Field
                name="comment"
                component="textarea"
                className="textarea"
                type="text"
              /> */}
              <textarea
                className="textarea"
                value={inputtingContent}
                onChange={e => onChangeContent(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="field is-grouped is-grouped-multiline">
            {featuredContents.map((content, index) => (
              <p key={index} className="control">
                <a className="button is-small">
                  <span>{content}</span>
                </a>
              </p>
            ))}
          </div>
          <div className="field">
            <label className="label">タグ</label>
          </div>
          <div className="field is-grouped is-grouped-multiline">
            {tags.map((tag, index) => (
              <TagLink
                key={index}
                index={index}
                tagTitle={tag.title}
                size="is-medium"
                handleDelete={removeTag}
              />
            ))}
          </div>
          <div className="field is-grouped is-grouped-multiline">
            {featuredTags.map((t, index) => (
              <p key={index} className="control">
                <a className="button is-small" onClick={e => addTag(t, true)}>
                  <span>{t}</span>
                </a>
              </p>
            ))}
          </div>
          <div className="field has-addons">
            <div className="control has-icons-left">
              <input
                className="input is-small"
                type="text"
                placeholder="Tag"
                value={inputtingTag}
                onChange={e => onChangeTagInput(e.currentTarget.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-tags" />
              </span>
            </div>
            <div className="control">
              <a
                className="button is-info is-small"
                onClick={e => addTag(inputtingTag, false)}
              >
                Add
              </a>
            </div>
          </div>
          <div className="field">
            <div className="field">
              <label className="label">背景色</label>
            </div>
            <CirclePicker
              colors={[
                '#F4F4F4',
                '#fdcfe8',
                '#ccff90',
                '#cbf0f8',
                '#fff475',
                '#fbbc04',
                '#d7aefb'
              ]}
              color={selectedColor}
              onChange={onChangeColor}
            />
          </div>
        </section>
        <footer
          className="modal-card-foot"
          style={{ justifyContent: 'flex-end' }}
        >
          <button
            type="submit"
            disabled={submitting}
            className="button is-success"
          >
            投稿
          </button>
          <button className="button">キャンセル</button>
        </footer>
      </div>
    </div>
  </form>
);

export default inputForm;
