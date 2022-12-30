import { Injectable } from '@nestjs/common';

// Import Tweet model
import { Tweet } from '../schemas/tweet.schema';

// To make request to the twitter API
import axios from 'axios';

@Injectable()
export class TwitterService {
  // Attributes
  // Base URL
  private BASE_URL = 'https://api.twitter.com/2';
  // Twitter API key
  private TWITTER_API_KEY: string;
  // Twitter API key secret
  private TWITTER_API_KEY_SECRET: string;
  // Twitter Bearer token
  private TWITTER_BEARER_TOKEN: string;
  // Number of tweets to get from each user
  private NB_TWEETS_PER_USER = 10;

  // Initialize API INFO
  constructor() {
    // Get environment variables
    this.TWITTER_API_KEY = process.env.TWITTER_API_KEY;
    this.TWITTER_API_KEY_SECRET = process.env.TWITTER_API_KEY_SECRET;
    this.TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
  }

  /**
   * Get a list of twitter users (by their id) and return a number of random tweets
   * @param id_twitter_users List of twitter users' id
   * @param nb_tweets Number of tweets to return
   */
  async getTweets(id_twitter_users: string[], nb_tweets: number) {
    // Initialize the list of tweets
    const tweets = [] as Tweet[];
    // Initialize the list of tweets from each user
    const tweets_from_each_user = {} as { [key: string]: Tweet[] };

    // For each user, get the last tweets
    for (const id_twitter_user of id_twitter_users) {
      // Get the last tweets
      const userTweets = await axios.get(
        `${this.BASE_URL}/users/${id_twitter_user}/tweets?max_results=${this.NB_TWEETS_PER_USER}`,
        {
          headers: {
            Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`,
          },
        },
      );
      // Push the tweets to the list of tweets from each user
      tweets_from_each_user[id_twitter_user] = userTweets.data.data;
    }

    // While the number of tweets is not reached
    while (tweets.length < nb_tweets) {
      // Get a random user
      const random_user =
        id_twitter_users[Math.floor(Math.random() * id_twitter_users.length)];

      // To avoid duplicate tweets, iterate until a tweet which is not allready in the list is found
      let random_tweet;
      do {
        // Get a random tweet from the random user
        random_tweet =
          tweets_from_each_user[random_user][
            Math.floor(
              Math.random() * tweets_from_each_user[random_user].length,
            )
          ];
      } while (tweets.includes(random_tweet));

      // Push the tweet to the list of tweets
      tweets.push({
        id: random_tweet.id,
        text: random_tweet.text,
        author_id: random_user,
        author_username: '',
      });
    }

    // Return the list of tweets
    return tweets;
  }
}
