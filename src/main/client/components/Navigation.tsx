import preact from "preact";
import {Link} from "preact-router/src";
import classnames from "classnames";

interface MenuGroupProps {
  name: string
  href: string
  regex?: string
}

interface MenuItemProps {
  name: string
  href: string
  regex?: string
  disabled?: string
}

export default function Navigation() {
  return (
    <div class="left-navigation">
      <Sitename />
      <Nav />
    </div>
  )
}

function Sitename() {
  return (
    <div class="sitename">
      <Link href="/" class="row middle center">
        <img src="/assets/logo-acve.png" alt="Logo de Voir & entendre" class="col"/>
        <span class="col">Voir &amp; entendre</span>
      </Link>
    </div>
  )
}

function Nav() {
  return (
    <nav>
      <MenuGroup name="Accueil" href="/" />
      <MenuGroup name="Les prochaines pièces" href="/shows" regex="/show(s|/.*)">
        <MenuItem name="Les Rustres" href="/show/read/les-rustres" />
        <MenuItem name="Amour Passion et CX Diesel" href="/show/read/amour-passion-et-cx-diesel" />
      </MenuGroup>
      <MenuGroup name="Les prochaines séances" href="/sessions" regex="/session(s|/.*)">
        <MenuItem name="01/01/2017 20:30 - Les Rustres" href="/session/x" />
        <MenuItem name="02/01/2017 15:30 - Amour Passion et CX Diesel" href="/session/x" />
      </MenuGroup>
      <MenuGroup name="L'association" href="/page/l'association">
        <MenuItem name="Le bureau" href="/page/bureau" />
        <MenuItem name="Historique" href="/page/historique" />
        <MenuItem name="Scéne et Loire" href="/page/scene-et-loire" />
        <MenuItem name="La compagnie du coin" href="/page/la-compagnie-du-coin" />
        <MenuItem name="Ateliers théâtre" href="/page/les-ateliers" />
        <MenuItem name="Ateliers chant" href="/page/atelier-chant" />
      </MenuGroup>
      <MenuGroup name="Mon espace" href="/personal/login" regex="/personal(/.*)?">
        <MenuItem name="Se connecter" href="/personal/login" />
        <MenuItem name="S'inscrire" href="/personal/register" />
        <MenuItem name="Ma fiche" href="/personal/my-card" disabled="Veuillez vous connecter pour accéder à ce menu" />
        <MenuItem name="(Ré)inscription aux activités" href="/personal/register" disabled="Veuillez vous connecter pour accéder à ce menu" />
      </MenuGroup>
      <MenuGroup name="Nous contacter" href="/contact" />
    </nav>
  )
}

function MenuGroup(props: MenuGroupProps) {
  return (
    <div class={classnames("menu-group", {"active": isElementActive(props)})}>
      <Link href={props.href}>{props.name}</Link>
      <div class="menu-items">
        {props["children"]}
      </div>
    </div>
  )
}

function MenuItem(props: MenuItemProps) {
  if (props.disabled) {
    return (
      <div class={classnames("menu-item", "disabled")}>
        <span title={props.disabled}>
          {props.name}
        </span>
      </div>
    )
  } else {
    return (
      <div class={classnames("menu-item", {"active": isElementActive(props)})}>
        <Link href={props.href}>
          {props.name}
        </Link>
      </div>
    )
  }
}

function isElementActive(props: MenuGroupProps | MenuItemProps) {
  const regex = props.regex || props.href
  return regex && new RegExp(`^${regex}$`).test(location.pathname)
}