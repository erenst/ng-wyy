import { PlayMode } from 'src/app/share/wy-ui/wy-player/wy-player.component';
import * as PlayActions from '../actions/player.actions';
import { createReducer, Action, on } from '@ngrx/store';
import {Song} from "../../service/data.models";

export type PlayerState = {
  // 播放状态
  playing: boolean;

  // 歌曲列表（原顺序）
  songList: Song[];

  // 歌曲列表（播放顺序）
  playList: Song[];

  // 模式
  playMode: PlayMode;

  // 当前正在播放的索引
  currentIndex: number;

  currentSong?: Song;
}


export const initialState: PlayerState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: { type: 'loop', label: '循环' },
  currentIndex: -1
};




const reducer = createReducer(
  initialState,
  on(PlayActions.SetPlayList, (state, { list }) => ({ ...state, playList: list })),
  on(PlayActions.SetPlaying, (state, { playing }) => ({ ...state, playing })),
  on(PlayActions.SetSongList, (state, { list }) => ({ ...state, songList: list })),
  on(PlayActions.SetPlayMode, (state, { mode }) => ({ ...state, playMode: mode })),
  on(PlayActions.SetCurrentIndex, (state, { index }) => ({ ...state, currentIndex: index }))
);

export function playerReducer(state: PlayerState | undefined, action: Action) {
  return reducer(state, action);
}