import preact from "preact"
import {AsyncPage} from "../../../framework/components/Page"
import {RichContent} from "../../../framework/components/RichContent";
import * as actions from "./playPageActions";
import {isAfterNow, longDateTimeFormat} from "../../../framework/utils/dates";
import {PlayPageState, playPageStore} from "./playPageStore";
import {Card, CardAction, CardContent} from "../../../framework/components/card/Card";
import {capitalizeFirstLetter} from "../../../framework/utils/strings";
import {Link} from "preact-router/src";
import ReservationForm from "../../reservation/reservationForm/reservationForm";
import ReservationList from "../../reservation/reservationList/reservationList";
import {findPlay, findPlaysByShow} from "../playApi";
import {findShow} from "../../show/showApi";
import {findCompany} from "../../company/companyApi";

export interface PlayPageProps {
  path: string
  company?: string
  show?: string
  id?: string
}

export default class PlayPage extends AsyncPage<PlayPageProps, PlayPageState> {
  constructor() {
    super(playPageStore)
  }

  initialize(props: PlayPageProps) {
    return Promise.all([
      findCompany(props.company),
      findShow(props.company, props.show),
      findPlay(props.company, props.show, props.id),
      findPlaysByShow(props.company, props.show)
    ])
      .then(([company, show, play, playsFromShow]) => actions.initialize({company, show, play, playsFromShow}))
  }

  getTitle(props: PlayPageProps, state: PlayPageState) {
    return `${capitalizeFirstLetter(longDateTimeFormat(state.play.date))} • ${state.show.title}`
  }

  renderPage(props: PlayPageProps, state: PlayPageState) {
    return (
      <div>
        <h2>Réservez vos places</h2>
        <ReservationForm
          company={state.company}
          show={state.show}
          play={state.play}
        />

        {this.renderInformation(state)}

        <ReservationList
          play={state.play}
        />
      </div>
    )
  }

  renderInformation(state: PlayPageState) {
    return (
      <section>
        <h2>{state.show.title}</h2>
        <div class="row">
          <div class="col-fill">
            {this.renderShowInformation(state)}
            {this.renderOtherPlays(state)}
          </div>
          <div class="col-fix-350">
            {this.renderTheaterInformation(state)}
          </div>
        </div>
      </section>
    )
  }

  renderShowInformation(state: PlayPageState) {
    return (
      <RichContent content={state.show.content}/>
    )
  }

  renderOtherPlays(state: PlayPageState) {
    const otherPlays = state.otherPlays.filter(_ => isAfterNow(_.date))
    if (otherPlays.length) {
      return (
        <div>
          <h3>Autres séances</h3>

          <ul>
            {otherPlays.map(play =>
              <li>
                <Link href={`/production/companies/${state.company.id}/shows/${state.show.id}/plays/page/${play.id}`}>
                  {capitalizeFirstLetter(longDateTimeFormat(play.date))}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )
    } else {
      return null
    }
  }

  renderTheaterInformation(state: PlayPageState) {
    const theater = state.play.theater;
    return (
      <Card title={theater.name}>
        <CardContent>
          <p>📍 {theater.address}</p>
          <RichContent content={theater.content} limit={500}/>
        </CardContent>
        <CardAction
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(theater.address)}`}
          target="blank"
        >
          Voir sur Google Maps
        </CardAction>
      </Card>
    )
  }
}