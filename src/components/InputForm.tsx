import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { NoteMap } from 'domain/Note';
// import Tag from 'components/Tag';
// import { CirclePicker } from 'react-color';

export interface InputFormProps {
  notes: NoteMap;
}

type InputType = InputFormProps & InjectedFormProps;

const showResult = (values: any) => {
  setTimeout(() => {
    window.alert(`values is ${JSON.stringify(values, null, '\t')}`);
  }, 1000);
};

const inputForm: React.SFC<InputType> = ({
  notes,
  handleSubmit,
  submitting
}) => (
  <form onSubmit={handleSubmit(showResult)}>
    <div>
      <Field name="firstName" component="input" type="text" />
    </div>
    <div>
      <Field name="lastName" component="input" type="text" />
    </div>
    <button type="submit" disabled={submitting}>
      Submit
    </button>
    <div>{/* <pre>{JSON.stringify(notes, null, '\t')}</pre> */}</div>
  </form>
  //   <div className="modal is-active">
  //      <div className="modal-background" />>
  //     <div className="modal-card">
  //       <header className="modal-card-head has-text-centered">
  //         <p className="modal-card-title">投稿する</p>
  //         <button className="delete" aria-label="close" />
  //       </header>
  //       <section className="modal-card-body">
  //         <div className="field">
  //           <label className="label">内容</label>
  //           <div className="control">
  //             <textarea className="textarea" />
  //           </div>
  //         </div>
  //         <div className="field is-grouped is-grouped-multiline">
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>登壇お疲れさまでした👏</span>
  //             </a>
  //           </p>
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>完全に理解した🤯</span>
  //             </a>
  //           </p>
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>勉強になった✍️</span>
  //             </a>
  //           </p>
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>クソコードオブザイヤーだ🤮</span>
  //             </a>
  //           </p>
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>お強い...💪</span>
  //             </a>
  //           </p>
  //         </div>
  //         <div className="field">
  //           <label className="label">タグ</label>
  //         </div>
  //         <div className="field is-grouped is-grouped-multiline">
  //           <Tag tagTitle="質問" size="is-medium" />
  //         </div>
  //         <div className="field is-grouped is-grouped-multiline">
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>初心者</span>
  //             </a>
  //           </p>
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>マサカリ</span>
  //             </a>
  //           </p>
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>オーガナイザー</span>
  //             </a>
  //           </p>
  //           <p className="control">
  //             <a className="button is-small">
  //               <span>お願い</span>
  //             </a>
  //           </p>
  //         </div>
  //         <div className="field has-addons">
  //           <div className="control has-icons-left">
  //             <input className="input is-small" type="text" placeholder="Tag" />
  //             <span className="icon is-small is-left">
  //               <i className="fas fa-tags" />
  //             </span>
  //           </div>
  //           <div className="control">
  //             <a href="#" className="button is-info is-small">
  //               Add
  //             </a>
  //           </div>
  //         </div>
  //         <div className="field">
  //           <div className="field">
  //             <label className="label">背景色</label>
  //           </div>
  //           <CirclePicker />
  //         </div>
  //       </section>
  //       <footer
  //         className="modal-card-foot"
  //         style={{ justifyContent: 'flex-end' }}
  //       >
  //         <button className="button is-success">投稿</button>
  //         <button className="button">キャンセル</button>
  //       </footer>
  //     </div>
  //  </div>
);

export default inputForm;
