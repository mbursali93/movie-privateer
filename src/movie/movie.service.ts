import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as fs from 'fs';

@Injectable()
export class MovieService {
  constructor(private readonly movieData: ElasticsearchService) {}
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

  async addMovie() {
    try {
      return await this.movieData.index({
        index: 'test',
        body: {
          title: 'testTitle',
          description: 'testDescription',
          isAdmin: true,
          likes: [{ id: 1, name: "ali" }, { id: 2, name: "irdan" }],
          more: {
            its: "good",
            really: "mean it"
          }
        },
      });

      //   return await this.movieData.indices.create({
      //     index: 'test', // Index name
      //     body: {
      //       mappings: {
      //         properties: {
      //           title: { type: 'text' },
      //           description: { type: 'text' },
      //           // Add more field mappings as needed
      //         },
      //       },
      //       settings: {
      //         // Configure index settings as needed
      //       },
      //     },
      //   });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
