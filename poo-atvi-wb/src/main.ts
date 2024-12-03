import promptSync from 'prompt-sync';
import { runApplication } from './app/app';

const prompt = promptSync();

runApplication(prompt);