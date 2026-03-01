const userController=require('../Controller/userController');
const User=require('../Model/User');

jest.mock('..model/User',()=>({
    create:jest.fn(),
    findAll:jest.fn(),
    findByPk:jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),

}));

// describe('User controller', ()=>{
//     const mockResponse=()=>{
//         const res={};
//         res.status=jest.fn().mockReturnValue(res);
//         res.json=jest.fn().mockReturnValue(res);
//         return res;
//     };
//     it('should create a new product', async(=>{
//         const req={body:{userName:'Test User', :}}
        
//     }))
// })