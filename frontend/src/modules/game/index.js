import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment"
import { Container, Grid } from "semantic-ui-react";
import ShowMoreText from "react-show-more-text";
import { Backdrop, Footer, Cover, Ratings } from "../app/components/";
import {
  Details,
  CoverLoader,
  Actions,
  TitleLoader,
  TextLoader,
  ActionsLoader,
  Screenshots
} from "./components/";
import "./styles.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSlug: "",
      game: {},
      ratings: [],
      isLoading: true
    };
  }

  componentWillMount() {
    var gameSlug = this.props.match.params.slug;
    this.resetState(gameSlug);
    this.loadGame(gameSlug);
    this.loadGameRatings(gameSlug);
  }

  //call this function to update state of a new game
  componentDidUpdate() {
    if (this.props.match.params.slug !== this.state.gameSlug) {
      const gameSlug = this.props.match.params.slug;
      this.resetState(gameSlug);
      this.loadGame(gameSlug);
    }
  }

  //resets game state
  resetState = gameSlug => {
    this.setState({
      gameSlug: gameSlug,
      game: {},
      ratings: [],
      isLoading: true
    });
  };

  //loads the new game
  loadGame = gameSlug => {
    axios.get(`/api/games/${gameSlug}`).then(res => {
      this.setState({
        game: res.data[0],
        isLoading: false
      });
    });
  };

  loadGameRatings = gameSlug => {
    axios.get(`/api/games/${gameSlug}/ratings`).then(res => {
      this.setState({
        ratings: res.data
      });
    });
  };

  //either returns a developer or an empty array
  getDeveloperName = companies => {
    var dev = companies.find(c => {
      return c.developer === true || {};
    });

    return dev.company.name;
  };

  render() {
    const { game, isLoading } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Grid className="game" centered>
            {!isLoading && this.state.game.screenshots && (
              <Backdrop imageId={game.screenshots[0].image_id} />
            )}
            <Grid.Row className="game-content">
              <React.Fragment>
                <Grid.Column width={4}>
                  {/* Game cover/poster */}
                  {!isLoading ? (
                    <React.Fragment>
                      <Cover
                        imageId={game.cover.image_id}
                        slug={game.slug}
                        className="cover-wrapper"
                        size="big"
                      />
                    </React.Fragment>
                  ) : (
                    <CoverLoader />
                  )}
                </Grid.Column>
                <Grid.Column width={12}>
                  {/* Game title */}
                  {!isLoading ? (
                    <section className="game-header margin-bottom-sm">
                      <h1>{game.name}</h1>
                      {game.first_release_date && (
                        <small className="release-date">
                          <a href="/">
                            <Moment format="YYYY">
                              {game.first_release_date * 1000}
                            </Moment>
                          </a>
                        </small>
                      )}
                      <small className="company">
                        <a href="/">
                          {game.involved_companies &&
                            this.getDeveloperName(game.involved_companies)}
                        </a>
                      </small>
                    </section>
                  ) : (
                    <TitleLoader />
                  )}
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={11}>
                        {/* Game summary & details */}
                        {!isLoading ? (
                          <section className="summary">
                            <ShowMoreText
                                lines={4}
                                more="Show more"
                                less="Show less"
                            >
                                <p>{game.summary}</p>
                            </ShowMoreText>
                            <Details game={game} />
                          </section>
                        ) : (
                          <TextLoader />
                        )}
                      </Grid.Column>
                      <Grid.Column width={5}>
                        {/* Actions menu */}
                        {!isLoading ? (
                          <Actions game={game} />
                        ) : (
                          <ActionsLoader />
                        )}
                        <Ratings
                          ratings={this.state.ratings}
                          showAverage={true}
                          height={55}
                          width={155}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </React.Fragment>
            </Grid.Row>
            <Grid.Row>
              {/* the following empty columns are used as offset */}
              <Grid.Column width={4} />
              <Grid.Column width={9}>
                {!isLoading && <Screenshots screenshots={game.screenshots} />}
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
          </Grid>
        </Container>
        {!isLoading && <Footer />}
      </React.Fragment>
    );
  }
}

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  })
};