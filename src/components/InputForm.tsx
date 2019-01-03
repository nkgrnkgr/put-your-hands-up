import * as React from 'react';
import TagLink from 'components/TagLink';
import Tag from 'domain/Tag';
import { CirclePicker, Color, ColorResult } from 'react-color';
import { FirebaseUser } from 'domain/FirebaseUser';
import NoteContents from 'domain/NoteContents';

const featuredContents = [
  '登壇お疲れさまでした👏',
  '完全に理解した🤯',
  '勉強になった✍',
  'クソコードオブザイヤーだ🤮',
  'お強い...💪'
];

const featuredTags = ['初心者', 'マサカリ', 'オーガナイザー', 'お願い'];

export interface InputFormProps {
  isActive: boolean;
  inputtingContent: string;
  inputtingTag: string;
  tags: Tag[];
  selectedColor: Color;
  toggleInputForm: () => void;
  onChangeContent: (inputtingContent: string) => void;
  addContent: (inputtingContent: string) => void;
  onChangeTagInput: (inputtingTag: string) => void;
  addTag: (title: string, isFeatured: boolean) => void;
  removeTag: (index: number) => void;
  onChangeColor: (color: Color) => void;
  resetInput: () => void;
  firestore?: any;
  auth: any;
}

const inputForm: React.SFC<InputFormProps> = ({
  isActive = false,
  inputtingContent = '',
  inputtingTag = '',
  tags = [],
  selectedColor,
  toggleInputForm = () => {},
  onChangeContent = () => {},
  addContent = () => {},
  onChangeTagInput = () => {},
  addTag = () => {},
  removeTag = () => {},
  onChangeColor = () => {},
  resetInput = () => {},
  firestore = {},
  auth
}) => {
  const onChangeHandleColor = (color: ColorResult) => {
    onChangeColor(color.hex);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: FirebaseUser = {
      uid: auth.uid,
      displayName: auth.displayName,
      photoURL: auth.photoURL
    };

    if (auth.isAnonymous) {
      user.photoURL = 'https://bulma.io/images/placeholders/128x128.png';
      user.displayName = '匿名ユーザー';
    }

    const tagTiles: string[] = [];
    tags.map(tag => {
      tagTiles.push(tag.title);
    });

    const noteContents: NoteContents = {
      comment: inputtingContent,
      tagTitles: tagTiles,
      createUserId: user.uid,
      fansIds: [],
      color: selectedColor,
      created: new Date().getTime()
    };

    firestore.add('notes', {
      user,
      noteContents
    });
    toggleInputForm();
    resetInput();
  };
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" />>
        <div className="modal-card">
          <header className="modal-card-head has-text-centered">
            <p className="modal-card-title">投稿する</p>
            <a
              className="delete"
              aria-label="close"
              onClick={toggleInputForm}
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">内容</label>
              <div className="control">
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
                  <a
                    className="button is-small"
                    onClick={e => addContent(content)}
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
                onSwatchHover={onChangeHandleColor}
              />
            </div>
          </section>
          <footer
            className="modal-card-foot"
            style={{ justifyContent: 'flex-end' }}
          >
            <button type="submit" className="button is-success">
              投稿
            </button>
            <a className="button" onClick={e => resetInput()}>
              キャンセル
            </a>
          </footer>
        </div>
      </div>
    </form>
  );
};

export default inputForm;
