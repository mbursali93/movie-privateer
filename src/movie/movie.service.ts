import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class MovieService {
  async getMovieDatas() {
    fs.readFile('movie_ids.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }

      const lines: string[] = data.trim().split('\n');
      console.log(lines.length);

      lines.forEach((line) => {
        try {
          const movie = JSON.parse(line);
          const movieId: number = movie.id;
          console.log(movieId);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
    });
    return 'movie datas!!!!';
  }
}
