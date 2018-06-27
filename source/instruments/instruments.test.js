import { sum, delay, getUniqueID, getFullApiUrl } from "./";

describe("instruments module:", () => {
    describe("sum function:", () => {
        test("sum should be a function", () => {
            // debugger;
            expect(sum).toBeInstanceOf(Function);
        });

        test("sum should add two numbers", () => {
            expect(sum(1, 3)).toBe(4);
        });

        test("sum should throw if first arg is not a number", () => {
            const result = () => sum("str", 1);

            expect(result).toThrow("Operand 1 should be a number.");
        });

        test("sum should throw if second arg is not a number", () => {
            const result = () => sum(1, "str");

            expect(result).toThrow("Operand 2 should be a number.");
        });
    });

    describe("delay function:", () => {
        test("should resolve a promise", () => {
            return expect(delay(2000)).resolves.toBeUndefined();
        });

        test("should resolve a promise of 1000ms as default parameter", async () => {
            await expect(delay()).resolves.toBeUndefined();
        });
    });

    describe("getUniqueID function:", () => {
        test("should throw if length not number", () => {
            const result = () => getUniqueID("str");

            expect(result).toThrow("The function argument should be a number!");
        });

        test("should return sthing", () => {
            expect(typeof getUniqueID()).toBe("string");
        });

        test("shoult return id with default length 15 characters", () => {
            expect(getUniqueID().length).toBe(15);
        });

        test("should return id whith length 3 characters", () => {
            expect(getUniqueID(3).length).toBe(3);
        });
    });

    describe("getFullApiUrl function", () => {
        test("sum should be a function", () => {
            expect(getFullApiUrl).toBeInstanceOf(Function);
        });

        test("should throw if api is not string", () => {
            const result = () => getFullApiUrl(1, "str");

            expect(result).toThrow(
                "'api' and 'GROUP_ID' arguments passed should be a string!"
            );
        });

        test("shoult throw if GROUP_ID is not string", () => {
            const result = () => getFullApiUrl("api", 1);

            expect(result).toThrow(
                "'api' and 'GROUP_ID' arguments passed should be a string!"
            );
        });

        test("shoult return correct full api url", () => {
            expect(getFullApiUrl("api", "GROUP_ID")).toBe("api/GROUP_ID");
        });
    });
});
