import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Import the Round model
import { Round, RoundDocument } from '../schemas/round.schema';

// To make operations via Twitter API
import { TwitterService } from '../twitter/twitter.service';

@Injectable()
export class RoundService {
  // Inject the Round model
  constructor(
    @InjectModel(Round.name) private roundModel: Model<RoundDocument>,
    private twitterService: TwitterService,
  ) {}

  getHello(): string {
    return 'Hello Round!';
  }

  // Create a new Round
  createRound(Round: Round): Promise<RoundDocument> {
    const createdRound = new this.roundModel(Round);
    return createdRound.save();
  }

  // Get a Round by its ID
  getRoundById(Round_id: string): Promise<RoundDocument> {
    return this.roundModel.findById(Round_id).exec();
  }

  /**
   * Generate round from a list of twitter users and the number of rounds
   * @param id_twitter_users List of twitter users' id
   * @param nb_rounds Number of rounds to generate
   */
  async generateRounds(
    id_twitter_users: string[],
    nb_rounds: number,
  ): Promise<RoundDocument[]> {
    // Get random tweets from each twitter user
    const tweets = await this.twitterService.getTweets(
      id_twitter_users,
      nb_rounds,
    );

    // Create rounds
    const rounds = [];

    for (let i = 0; i < nb_rounds; i++) {
      const round = await this.createRound({
        id_tweet: tweets[i].id,
        tweet: tweets[i],
        id_twitter_user_response: tweets[i].author_id,
        id_twitter_user_propositions: id_twitter_users,
        player_responses: {},
      });
      rounds.push(round);
    }

    // Return rounds
    return rounds;
  }
}
