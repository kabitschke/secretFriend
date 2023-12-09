import { PrismaClient, Prisma } from "@prisma/client";
import * as people from  './people';
import * as groups from './groups';


const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.event.findMany();
    } catch (err) {
        return false;
    }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.event.findFirst({ where: { id } });

    } catch (err) { return false }
}

type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'>['data'];
export const add = async (data: EventsCreateData) => {

    try {
        return await prisma.event.create({ data });

    } catch (err) { return false }
}


type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data'];
export const update = async (id: number, data: EventsUpdateData) => {

    try {
        return await prisma.event.update({ where: { id }, data });
    } catch (err) { return false }

}

export const remove = async (id: number) => {
    try {
        return await prisma.event.delete({ where: { id } })

    } catch (err) { return false }
}

export const doMatches = async (id: number): Promise<boolean> => {
        const  eventItem = await prisma.event.findFirst({where: {id}, select: {grouped: true}});

        if(eventItem){
            const peopleList = await people.getAll({id_event: id});

            if(peopleList){
                let sortedList: {id:number, match:number} [] = [];
                let sortable: number[] = [];


                let attempts = 0;
                let maxAttempts = peopleList.lenght;
                let keepTrying = true;
                while(keepTrying && attempts < maxAttempts){

                }


                // if(attempts < maxAttempts){
                //     for(let i in sortedList){
                //         await people.update({
                //             id: sortedList[i].id,
                //             id_event: id
                //         }, { matched: ''});  // TODO: Criar  encryptMatch()  
                //     }
                //     return true;
                // }
            }
        }


    return false;
}
