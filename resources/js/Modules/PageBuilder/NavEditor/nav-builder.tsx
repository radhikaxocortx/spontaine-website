import { LinkData, NavMenuItem, RequiredTextData } from '../page_interfaces'

export interface NavBuilderAction {
  action:
    | 'ADD_SECTION'
    | 'ADD_LINK'
    | 'CHANGE_SECTION'
    | 'REMOVE_SECTION'
    | 'REMOVE_LINK'
    | 'UPDATE_LINK'
    | 'UPDATE_SECTION'
  sections?: NavMenuItem | null
  sectionName?: RequiredTextData
  sectionId?: number
  link?: LinkData
  linkId?: number
}

const changeSection = (section: NavMenuItem | null) => {
  if (section == null) {
    return null
  }
  return section
}

const addSection = (
  state: NavMenuItem | null,
  sectionName?: RequiredTextData
): NavMenuItem | null => {
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
  state: NavMenuItem | null,
  sectionId?: number,
  sectionName?: RequiredTextData
): NavMenuItem | null => {
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

const removeSection = (state: NavMenuItem | null, sectionId?: number): NavMenuItem | null => {
  if (sectionId == null || state == null) {
    return state
  }
  return {
    ...state,
    items: state.items.filter((section) => section.id !== sectionId),
  }
}

const addLink = (
  state: NavMenuItem | null,
  sectionId?: number,
  link?: LinkData
): NavMenuItem | null => {
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
  state: NavMenuItem | null,
  sectionId?: number,
  link?: LinkData,
  linkId?: number
): NavMenuItem | null => {
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
  state: NavMenuItem | null,
  sectionId?: number,
  linkId?: number
): NavMenuItem | null => {
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

const navBuilder = (state: NavMenuItem | null, action: NavBuilderAction): NavMenuItem | null => {
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
