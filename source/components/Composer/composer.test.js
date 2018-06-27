import React from "react";
import { mount, render } from "enzyme";

import { Composer } from "./";

const mocks = {
    _createPostAsyncMock: jest.fn(() => Promise.resolve()),
    preventDefaultMock:   jest.fn(),
};

const currentUserFirstName = "Vasya";
const avatar = "https://www.avatar.com";

const props = {
    avatar,
    currentUserFirstName,
    _createPostAsync: mocks._createPostAsyncMock,
};

const initialState = {
    comment: "",
};

const testComment = "Hello!";

const updateState = {
    comment: testComment,
};

const result = mount(<Composer { ...props } />);
const markup = render(<Composer { ...props } />);

const spies = {
    _handleUpdateCommentSpy: jest.spyOn(
        result.instance(),
        "_handleUpdateComment"
    ),
    _submitCommentSpy:       jest.spyOn(result.instance(), "_submitComment"),
    _handleFormSubmitSpy:    jest.spyOn(result.instance(), "_handleFormSubmit"),
    _handleSubmitOnEnterSpy: jest.spyOn(
        result.instance(),
        "_handleSubmitOnEnter"
    ),
};

describe("Composer component:", () => {
    describe("should have valid markup", () => {
        test("core JSX", () => {
            expect(result.find("section.composer")).toHaveLength(1);
            expect(result.find("form")).toHaveLength(1);
            expect(result.find("textarea")).toHaveLength(1);
            expect(result.find("input")).toHaveLength(1);
            expect(result.find("img")).toHaveLength(1);
        });
    });

    describe("should have valid props", () => {
        test("_createPostAsync should be an async function", async () => {
            await expect(
                result.prop("_createPostAsync")()
            ).resolves.toBeUndefined();
        });

        test("currentUserFirstName should be a string", () => {
            expect(typeof result.prop("currentUserFirstName")).toBe("string");
        });

        test("avatar shoult be a string", () => {
            expect(typeof result.prop("avatar")).toBe("string");
        });
    });

    describe("should have valid state", () => {
        test("comment should be empty string", () => {
            expect(result.state("comment")).toBe("");
        });
    });

    describe("should have core class methods", () => {
        describe("_handleFormSubmit", () => {
            beforeEach(() => {
                result.instance()._handleFormSubmit({
                    preventDefault: mocks.preventDefaultMock,
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            test("should call preventDefault when invoked as onSubmit event", () => {
                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });

            test("should call _submitComment when invoked as onSubmit", () => {
                expect(spies._submitCommentSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe("_submitComment", () => {
            afterEach(() => {
                result.setState(initialState);
            });

            test("should do nothing if state.comment is empty", () => {
                result.instance()._submitComment();

                expect(spies._submitCommentSpy).toHaveReturnedWith(null);
                expect(mocks._createPostAsyncMock).not.toHaveBeenCalled();
                expect(result.state()).toEqual(initialState);
            });

            test("should call _createPostAsync with comment", () => {
                result.setState({ comment: testComment });
                result.instance()._submitComment();

                expect(mocks._createPostAsyncMock).toHaveBeenNthCalledWith(
                    1,
                    testComment
                );
                expect(result.state()).toEqual(initialState);
            });
        });

        describe("_handleUpdateComment", () => {
            test("should update state.comment when called onChange", () => {
                result.instance()._handleUpdateComment({
                    target: { value: testComment },
                });

                expect(result.state()).toEqual(updateState);
                jest.clearAllMocks();
            });
        });

        describe("_handleSubmitOnEnter", () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            test("with Enter key", () => {
                result.instance()._handleSubmitOnEnter({
                    preventDefault: mocks.preventDefaultMock,
                    key:            "Enter",
                });

                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
                expect(spies._submitCommentSpy).toHaveBeenCalledTimes(1);
            });

            test("with Shift key", () => {
                result.instance()._handleSubmitOnEnter({
                    preventDefault: mocks.preventDefaultMock,
                    key:            "Shift",
                });

                expect(mocks.preventDefaultMock).not.toHaveBeenCalled();
                expect(spies._submitCommentSpy).not.toHaveBeenCalled();
            });
        });

        describe("_preventCopyText", () => {
            test("should call preventDefault", () => {
                result.instance()._preventCopyText({
                    preventDefault: mocks.preventDefaultMock,
                });

                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });
        });

        describe("should implement core business logic", () => {
            test("textarea value should be empty", () => {
                expect(result.find("textarea").text()).toBe("");
            });

            test("textarea value should be controlled by state", () => {
                expect(result.state("comment")).toBe("");
                expect(result.find("textarea").text()).toBe("");

                result.setState({
                    comment: testComment,
                });

                expect(result.find("textarea").text()).toBe(testComment);
                jest.clearAllMocks();
            });

            test("textarea onChange event should triger _updateComment", () => {
                result.find("textarea").simulate("change", {
                    target: {
                        value: testComment,
                    },
                });

                expect(spies._handleUpdateCommentSpy).toHaveBeenCalledTimes(1);
                expect(result.find("textarea").text()).toBe(testComment);
                expect(result.state()).toEqual(updateState);
            });
        });

        describe("should render valid markup depending on passed props", () => {
            test("should contain CSS class composer", () => {
                expect(markup.attr("class")).toBe("composer");
            });

            test("textarea should contain valid placeholder", () => {
                expect(markup.find("textarea").attr("placeholder")).toBe(
                    `What is in you mind ${currentUserFirstName}`
                );
            });

            test("img should contain valid src", () => {
                expect(markup.find("img").attr("src")).toBe(avatar);
            });

            test("snapshot should mathc", () => {
                expect(markup.html()).toMatchSnapshot();
            });
        });
    });
});
