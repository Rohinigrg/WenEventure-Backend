import * as userController from "../../Controller/userController.js";
import User from "../Model/userModel.js";

jest.mock("../Model/userModel.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CREATE USER
  it("should create a user", async () => {
    const req = {
      body: {
        fullName: "Test User",
        userName: "test123",
        email: "test@test.com",
        password: "123456",
      },
    };

    const res = mockResponse();

    User.create.mockResolvedValue(req.body);

    await userController.save(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  // ✅ GET ALL USERS
  it("should fetch all users", async () => {
    const req = {};
    const res = mockResponse();

    User.findAll.mockResolvedValue([{ fullName: "User1" }]);

    await userController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // ✅ USER NOT FOUND
  it("should return 404 if user not found", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    User.findOne.mockResolvedValue(null);

    await userController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

});