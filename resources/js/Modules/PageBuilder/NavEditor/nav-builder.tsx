import { LinkData, NavMenuSection, RequiredTextData } from '../page_interfaces'

export interface NavBuilderAction {
  action:
    | 'ADD_SECTION'
    | 'ADD_LINK'
    | 'CHANGE_SECTION'
    | 'REMOVE_SECTION'
    | 'REMOVE_LINK'
    | 'UPDATE_LINK'
    | 'UPDATE_SECTION'
  sections?: NavMenuSection | null
  sectionName?: RequiredTextData
  sectionId?: number
  link?: LinkData
  linkId?: number
}

const changeSection = (section: NavMenuSection | null) => {
  if (section == null) {
    return null
  }
  return section
}

const addSection = (
  state: NavMenuSection | null,
  sectionName?: RequiredTextData
): NavMenuSection | null => {
  if (sectionName == null || state == null) {
    return state
  }
  return {
    lastUUID: state.lastUUID + 1,
    items: [
      ...state.items,
      {
        id: state.lastUUID + 1,
        section: sectionName,
        lastUUID: 0,
        links: [],
      },
    ],
  }
}

const updateSectionName = (
  state: NavMenuSection | null,
  sectionId?: number,
  sectionName?: RequiredTextData
): NavMenuSection | null => {
  if (sectionId == null || sectionName == null || state == null) {
    return state
  }
  return {
    ...state,
    items: state.items.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          section: sectionName,
        }
      }
      return section
    }),
  }
}

const removeSection = (state: NavMenuSection | null, sectionId?: number): NavMenuSection | null => {
  if (sectionId == null || state == null) {
    return state
  }
  return {
    ...state,
    items: state.items.filter((section) => section.id !== sectionId),
  }
}

const addLink = (
  state: NavMenuSection | null,
  sectionId?: number,
  link?: LinkData
): NavMenuSection | null => {
  if (sectionId == null || link == null || state == null) {
    return state
  }
  return {
    ...state,
    items: state.items.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          lastUUID: section.lastUUID + 1,
          links: [
            ...section.links,
            {
              ...link,
              id: section.lastUUID + 1,
            },
          ],
        }
      }
      return section
    }),
  }
}

const updateLink = (
  state: NavMenuSection | null,
  sectionId?: number,
  link?: LinkData,
  linkId?: number
): NavMenuSection | null => {
  if (sectionId == null || link == null || linkId == null || state == null) {
    return state
  }
  return {
    ...state,
    items: state.items.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          links: section.links.map((oldLink) => {
            if (oldLink.id === linkId) {
              return {
                ...oldLink,
                ...link,
              }
            }
            return oldLink
          }),
        }
      }
      return section
    }),
  }
}

const removeLink = (
  state: NavMenuSection | null,
  sectionId?: number,
  linkId?: number
): NavMenuSection | null => {
  if (sectionId == null || linkId == null || state == null) {
    return state
  }
  return {
    ...state,
    items: state.items.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          links: section.links.filter((link) => link.id !== linkId),
        }
      }
      return section
    }),
  }
}

const navBuilder = (
  state: NavMenuSection | null,
  action: NavBuilderAction
): NavMenuSection | null => {
  switch (action.action) {
    case 'ADD_SECTION': {
      return addSection(state, action.sectionName)
    }
    case 'CHANGE_SECTION': {
      return changeSection(action.sections ?? state)
    }
    case 'REMOVE_SECTION': {
      return removeSection(state, action.sectionId)
    }
    case 'UPDATE_SECTION': {
      return updateSectionName(state, action.sectionId, action.sectionName)
    }
    case 'ADD_LINK': {
      return addLink(state, action.sectionId, action.link)
    }
    case 'UPDATE_LINK': {
      return updateLink(state, action.sectionId, action.link, action.linkId)
    }
    case 'REMOVE_LINK': {
      return removeLink(state, action.sectionId, action.linkId)
    }
    default: {
      return state
    }
  }
}

export default navBuilder
