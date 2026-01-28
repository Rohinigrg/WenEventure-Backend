const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
 const UserMock = dbMock.define('User',{
    id : 1,
    fullname: 'Test product',
    username:'kohinoor',
    email: 'kohinoor@gmail.com',
    password: '123456',
 })
 
describe("User Model", () => {
  it("should create a user with default role", async () => {
    const user = await UserMock.create({
      fullname: "Rohini Gurung",
      username: "rohini",
      email: "rohini@gmail.com",
      password: "123456",
    });

    expect(user.fullname).toBe("Rohini Gurung");
    expect(user.username).toBe("rohini");
    expect(user.email).toBe("rohini@gmail.com");
    expect(user.role).toBe("user"); 
  });

  it("should fail when required fields are missing", async () => {
    await expect(UserMock.create({})).rejects.toThrow();
  });
});
  
 
 
 