import { PrismaClient, PrismaPromise } from '@prisma/client'

const prisma = new PrismaClient()


// export const addPerson = async (id: number) => {
//     return prisma.person.findFirst({
//         where: {
//             id
//         }
//     })
// }

// export const createPerson = async (name: string) => {
//     const person = await prisma.person.findFirst({
//         where: {
//             name
//         }
//     })

//     if (!person) {
//         return {
//             person: await prisma.person.create({
//                 data: {
//                     name,
//                     // dataset_id: 1
//                 }
//             }),
//             isNew: true
//         }
//     }

//     return {
//         person,
//         isNew: false
//     }
// }


export const getPersonLast_Photo = async (ids: string[]) => {
    return prisma.photo.findMany({
        where: {
            AND: [
                {       
                    person: {
                        dataset_id: {
                            in: ids
                        }
                    }
                }, 
                {
                    created_at: {
                        lt: new Date(Date.now() - (2 * 60 * 1000))
                    }
                }
            ]
        },
        orderBy:  {
            id: "desc"
        },
        // include: {
        //     person: true,
        //     created_at
        // }
    })
}


export const getPersonLast_Photo1 = async (id: string) => {
    return prisma.photo.findFirst({
        where: {
            person: {
                dataset_id: id
            }
        },
        orderBy:  {
            id: "desc"
        }
        // include: {
        //     person: true,
        //     created_at
        // }
    })
}


export const findPerson  =  async (id: string) => {
    return prisma.person.findFirst({
        where: {
            dataset_id: id,
        }
    })
}


export const findPersonPhotos = async (name: string, take=5) => {
    return prisma.photo.findMany({
        where: {
            person: {
                name
            }
        },
        take
    })
}

export const getAllVisitors  =  async () => {
    return prisma.photo.findMany({
        where: {},
        distinct: ["personId"],
        include: {
            person: true
        }
    })
}

export const addPhoto = async (id: string, fileName: string) => {
    const person = await findPerson(id)

    if (!person) return;

    return prisma.photo.create({
        data: {
            personId: person.id,
            fileName
        }
    })
}

const people = [ 
    "Батомункуев Павел Максимович","Быструшкин Евгений Михайлович","Гавриленко Мария","Елёскин Егор Евгеньевич","Ершов Григорий Аркадьевич","Иваненко Дмитрий Дмитриевич","Иванов Александр Александрович","Каратаев Вячеслав","Керноз Игорь Сергеевич","Козлова Анастасия Геннадиевна","Коровкин Никита","Кузнецова Полина Ивановна","Куприянова Кристина Сергеевна","Леденгская Милана","Литвиненко Анастасия Сергеевна","Матюшина Татьяна Сергеевна","Митин Кирилл Иванович","Мясников Лев Сергеевич","Назарова Юлия Андреевна","Пархоменко Богдан Борисович","Пилецкий Михаил Андреевич","Почебыт Валерия Евгеньевна","Сидоров Владислав Владимирович","Фомин Илья Сергеевич","Чубарова Екатерина","Шумаков Сергей","Яблонский Ян Витальевич","Ярлыкова Юлия","Шелупанов Александр Александрович","undefied","Орлова Ольга Александровна","Сулаев Евгений Викторович","Ефремов Алексей Юрьевич","Колесов Илья Борисович" 
]

export const fillPeople = async () => {
    for (let i = 0; i < people.length; i++) {
        const name = people[i];
        const res = await prisma.person.create({
            data: {
                name,
                dataset_id: (i+1).toString()
            }
        })
        console.log(res)
    }
}
// fillPeople()

// export const createPaymentDoc = async (uuid: string, chat_id: string, geo: string, product: prdouctTime, price: number) => {
//     const expire_date = new Date(Date.now() + pricesTimedelta[product])

//     return logErrorTransaction(prisma.payment.create({
//         data: {
//             uuid,
//             chat_id,
//             geo,
//             product,
//             price,
//             expire_date
//         }
//     }))
// }

// export const createFreePaymentDoc = async (uuid: string, chat_id: string) => {
//     const expire_date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

//     return logErrorTransaction(prisma.payment.create({
//         data: {
//             uuid,
//             chat_id,
//             geo: "ge",
//             product: "free",
//             price: 0,
//             expire_date,
//             is_active: true,
//             is_success: true
//         }
//     }))
// }

// export const getPaymentDoc = async (uuid: string) => {
//     return logErrorTransaction(prisma.payment.findFirst({
//         where: {
//             uuid
//         }
//     }))
// }

// export const setPaymentSuccess = async (uuid: string) => {
//     return logErrorTransaction(prisma.payment.update({
//         where: {
//             uuid
//         },
//         data: {
//             is_success: true,
//             is_active: true
//         }
//     }))
// }

// export const updatePaymentProfileId = async (uuid: string, profileId: string | null) => {
//     return logErrorTransaction(
//         prisma.payment.update({
//             where: {
//                 uuid
//             },
//             data: {
//                 profileId: profileId
//             }
//         })
//     )
// }


// export const updateExpiresPayment = async (uuid: string) => {
//     return logErrorTransaction(
//         prisma.payment.update({
//             where: {
//                 uuid
//             },
//             data: {
//                 is_active: false,
//             }
//         })
//     )
// }


// export const updatePaymentGeo = async (uuid: string, geo: string) => {
//     return logErrorTransaction(
//         prisma.payment.update({
//             where: {
//                 uuid
//             },
//             data: {
//                 geo
//             }
//         })
//     )
// }

// export const updatePaymentProduct = async (uuid: string, profileId: string | undefined) => {
//     return logErrorTransaction(
//         prisma.payment.update({
//             where: {
//                 uuid
//             },
//             data: {
//                 product: profileId
//             }
//         })
//     )
// }


// export const getProfilesNumber = async (chat_id: string) => {
//     return logErrorTransaction(
//         prisma.payment.aggregate({
//             where: {
//                 chat_id,
//             },
//             _count: {
//                 id: true
//             }
//         })
//     )
// }


// export const getFreeProfilesNumber = async (chat_id: string) => {
//     return logErrorTransaction(
//         prisma.payment.aggregate({
//             where: {
//                 chat_id,
//                 product: "free"
//             },
//             _count: {
//                 id: true
//             }
//         })
//     )
// }

// export const getActiveProfiles = async (chat_id: string) => {
//     return logErrorTransaction(
//         prisma.payment.findMany({
//             where: {
//                 chat_id,
//                 is_active: true,
//             }
//         })
//     )
// }

// export const getExpiredProfiles = async () => {
//     return logErrorTransaction(
//         prisma.payment.findMany({
//             take: 6,
//             where: {
//                 is_active: true,
//                 expire_date: {
//                     lt: new Date(Date.now())
//                 }
//             }
//         })
//     )
// }

// export const updateRefererBalance = async (child_chat_id: string, volume: number) => {
//     try {
//         const user = await prisma.user.findFirst({
//             where: {
//                 chat_id: child_chat_id
//             }
//         })

//         if (!user?.referer_id) return;

//         return prisma.user.update({
//             where: {
//                 id: user.referer_id
//             },
//             data: {
//                 referal_balance: {
//                     increment: volume
//                 }
//             }
//         })
//     }
//     catch (err) {
//         logErrorWithComment(err, "updateRefererBalance")
//     }
// }

// export const getReferers = async (chat_id: string) => {
//     try {
//         const user = await prisma.user.findFirst({
//             where: {
//                 chat_id
//             }
//         })

//         if (!user) return;

//         return logErrorTransaction(
//             prisma.user.aggregate({
//                 _count: true,
//                 where: {
//                     referer_id: user.id
//                 }
//             })
//         )
//     }
//     catch (err) {
//         logErrorWithComment(err, "getReferers")
//     }
// }