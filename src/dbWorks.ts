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
    "Batomunkuev Pavel Maksimovich","Bystrushkin Evgenij Mihajlovich","Gavrilenko Mariya","Elyoskin Egor Evgenevich","Ershov Grigorij Arkadevich","Ivanenko Dmitrij Dmitrievich","Ivanov Aleksandr Aleksandrovich","Karataev Vecheslav","Kernoz Igor Sergeevich","Kozlova Anastasiya Genadevna","Korovkin Nikita","Kuznecova Polina Ivanovna","Kupriyanova Kristina Sergeevna","Ledengskaya Milana","Litvinenko Anastasiya Sergeevna","Matyushina Tatyana Sergeevna","Mitin Kirill Ivanovich","Myasnikov Lev Sergeevich","Nazarova YUliya Andreevna","Parhomenko Bogdan Borisovich","Pileckij Mihail Andreevich","Pochebyt Valeriya Evgenevna","Sidorov Vladislav Vladimirovich","Fomin Ilya Sergeevich","CHubarova Ekaterina","SHumakov Sergej","YAblonskij YAn Vitalevich","YArlykova YUliya","SHelupanov Aleksandr Aleksandrovich","undefied","Orlova Olga Aleksandrovna","Sulaev Evgenij Viktorovich","Efremov Aleksej YUrevich","Kolesov Ilya Borisovich"
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