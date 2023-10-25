import { default as extend } from '../common/extend';
import Extend from 'flarum/common/extenders';
import GdprPage from './GdprPage';

export default [
  ...extend,

  new Extend.Routes() //
    .add('gdpr', '/gdpr', GdprPage),
];
