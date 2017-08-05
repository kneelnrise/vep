import preact from "preact"
import {AsyncPage} from "../../../framework/components/Page"
import {Card, CardContent} from "../../../framework/components/card/Card";
import CardCollection from "../../../framework/components/card/CardCollection";
import * as actions from "./adhesionListActions";
import {findAdhesionsByPeriod, findPeriodAdhesion} from "../adhesionApi";
import {Adhesion} from "../adhesionModel";
import {shortPeriodFormat} from "../../../common/types/Period";
import {AdhesionListState, adhesionListStore} from "./adhesionListStore";
import {shortDateFormat} from "../../../framework/utils/dates";

export interface AdhesionListProps {
  path: string
  period?: string
}

export default class AdhesionList extends AsyncPage<AdhesionListProps, AdhesionListState> {
  constructor() {
    super(adhesionListStore)
  }

  initialize(props: AdhesionListProps) {
    return Promise.all([
      findPeriodAdhesion(props.period),
      findAdhesionsByPeriod(props.period)
    ]).then(([period, adhesions]) => actions.initialize({period, adhesions}))
  }

  getTitle(props: AdhesionListProps, state: AdhesionListState) {
    return `${shortPeriodFormat(state.period.period)} – Adhésions`
  }

  renderPage(props: AdhesionListProps, state: AdhesionListState) {
    return (
      <div>
        {this.renderAdhesions(state.notAcceptedAdhesions, "En attente de validation")}
        {this.renderAdhesions(state.acceptedAdhesions, "Validées")}
      </div>
    )
  }

  renderAdhesions(adhesions: Array<Adhesion>, title: string) {
    if (adhesions && adhesions.length) {
      return (
        <div>
          <h2>{title}</h2>
          <CardCollection columns={2}>
            {adhesions.map(this.renderAdhesion)}
          </CardCollection>
        </div>
      )
    } else {
      return null
    }
  }

  renderAdhesion(adhesion: Adhesion) {
    return (
      <Card title={`${adhesion.user.firstName} ${adhesion.user.lastName}`}>
        <CardContent>
          <ul>
            {adhesion.members.map(member => (
              <li>
                {member.firstName} {member.lastName} ({shortDateFormat(member.birthday)}) : {member.activity}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }
}