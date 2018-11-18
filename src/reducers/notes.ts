import * as Action from 'actions/note';
import { Note } from 'domain/Note';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  [s: string]: Note;
}

const initialState: State = {
  n000001: {
    noteId: 'n000001',
    user: {
      name: 'Nokogiri',
      id: 'nkgrnkgr'
    },
    noteContents: {
      comment:
        'このライブラリはどこからダウンロードできるかあとで教えてください😇',
      tagTitles: ['初心者', '質問'],
      createUserId: 'nkgrnkgr',
      fansIds: [
        'nkgrnkgr',
        'MAcadsPidLsBLYQH',
        'HLSJzKjV7uKyDrW2',
        'jt9rZC3crjhLCMAM',
        'FY3rWLRFAuReRwEc',
        'UKiTU2TFre89zLpM'
      ],
      color: '#F4F4F4',
      editable: true,
      isUpdating: false,
      updated: 1541249701000
    },
    image: {
      url:
        'https://pbs.twimg.com/profile_images/991286980917936128/L26P2KQQ_400x400.jpg',
      title: 'nkgrnkgr',
      size: 32
    }
  },
  n000002: {
    noteId: 'n000002',
    user: {
      name: '匿名希望さん',
      id: 'HLSJzKjV7uKyDrW2'
    },
    noteContents: {
      comment:
        'さっきのライブラリは既に最新バージョンでは非推奨です。xxを使いましょう😊',
      tagTitles: ['マサカリ'],
      createUserId: 'MAcadsPidLsBLYQH',
      fansIds: [''],
      color: '#cbf0f8',
      editable: false,
      isUpdating: true,
      updated: 1541251714000
    },
    image: {
      url: 'https://bulma.io/images/placeholders/96x96.png',
      title: 'placeholder',
      size: 32
    }
  },
  n000003: {
    noteId: 'n000003',
    user: {
      name: 'あのにます',
      id: 'MAcadsPidLsBLYQH'
    },
    noteContents: {
      comment: 'スライドの文字が小さいので見えない...',
      tagTitles: ['お願い'],
      createUserId: 'MAcadsPidLsBLYQH',
      fansIds: [''],
      color: '#fdcfe8',
      editable: false,
      isUpdating: false,
      updated: 1541251714000
    },
    image: {
      url: 'https://bulma.io/images/placeholders/96x96.png',
      title: 'placeholder',
      size: 32
    }
  }
};

const notesReducer = reducerWithInitialState(initialState)
  .case(Action.addNote, (state, payload) => {
    const { note } = payload;
    if (note) {
      return add(state, note);
    }
    return state;
  })
  .case(Action.removeNote, (state, payload) => {
    if (payload.noteId) {
      return remove(state, payload.noteId);
    }
    return state;
  })
  .case(Action.updateNote, (state, payload) => {
    const { noteId, note } = payload;
    if (noteId && note) {
      const removedState = remove(state, noteId);
      return add(removedState, note);
    }
    return state;
  });

const add = (state: State, note: Note) => ({
  ...state,
  [note.noteId]: note
});

const remove = (state: State, noteId: string) => {
  const tmp = {
    ...state
  };
  delete tmp[noteId];
  return tmp;
};

export default notesReducer;
