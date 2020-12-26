import Ticket from '../Ticket.model'


it('Implements optimistic concurrency control', async(done)=>{

    const ticket = Ticket.build({
        title:'Concert',
        price:5,
        userId:'123'
    })

    await ticket.save();


    const firstIntance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id)

    firstIntance!.set({price:10})
    secondInstance!.set({price:15})

    await firstIntance!.save()


    try {
        await secondInstance!.save()
 
    } catch (error) {
        return done();
    }
  
    throw new Error('Should not reach this point')
})

it("Increments the version number on multiple saves", async ()=>{
    const ticket = Ticket.build({
        title:'Concert',
        price:5,
        userId:'123'
    })

    await ticket.save();

    expect(ticket.version).toEqual(0)

    await ticket.save();

    expect(ticket.version).toEqual(1)

    await ticket.save();

    expect(ticket.version).toEqual(2)
})