
export const getInitials = (name = '') => {
    const isSingleWord = name.split(' ').length === 1

    if(isSingleWord) {
        return name[0]

    }

    return name.split(' ')[0][0] + name.split(' ')[1][0]
}

export const getOtherMember = (members = [], userId) =>
 { return members.filter((member) => member.id !== userId)[0]

}