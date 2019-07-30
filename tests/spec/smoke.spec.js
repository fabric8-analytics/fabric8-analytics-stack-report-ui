// import { browser, by, element, $, $$, ElementFinder, ElementArrayFinder } from 'protractor';

describe('fabric8-analytics-stack-report-ui', () => {
    beforeAll(() => {
        let appUrl = '#/analyze/' + browser.params.ANALYSES_REQUEST_ID + '?api_data={"access_token":"' + browser.params.RECOMMENDER_API_TOKEN + '","route_config": {"api_url":"' + browser.params.RECOMMENDER_API_END_POINT + '"}}';
        console.log('stack report url:', browser.baseUrl + appUrl);
        browser.get(appUrl);
    });

    describe('Stack Report', () => {
        let tabContainer = element.all(by.css('.nav.nav-tabs')).get(0);
        let firstTabItem = tabContainer.$$('.nav-item').get(0);
        let reportSummaryContainer = $('analytics-report-summary .analytics-summary-report');
        let securityCard = reportSummaryContainer.$$('analytics-summary-card').get(0);
        let licensesCard = reportSummaryContainer.$$('analytics-summary-card').get(1);
        let insightsCard = reportSummaryContainer.$$('analytics-summary-card').get(2);
        let componentDetailsCard = reportSummaryContainer.$$('analytics-summary-card').get(3);
        let cardDetailsContainer = $('card-details .analytics-card-details');

        describe('Manifest tabs', () => {
            it('Is the first tab selected ?', () => {
                expect(firstTabItem.getAttribute('class')).toMatch('nav-item active-menu-item active');
            });
    
            it('Is the first tab has a warning icon ?', () => {
                expect(firstTabItem.$$('i.pficon-warning-triangle-o').isPresent()).toBe(true);
            });
    
            it('Is the first tab has a text `pom.xml` ?', () => {
                expect(firstTabItem.$$('span').get(1).getText()).toEqual('pom.xml');;
            });
        });
    
        describe('Summary Section', () => {
            let titleClassString = 'analytics-summary-title .analytics-summary-title .card-pf-title';
    
            describe('Security Card', () => {
                it('Is card header `Security Issues`', () => {
                    let cardTitle = securityCard.$$(titleClassString).get(0);
                    expect(cardTitle.getText()).toContain('Security Issues');
                });
    
                it('Is card highlighted ?', () => {
                    expect(securityCard.$$('.analytics-summary-card.highlight').get(0).isPresent()).toBe(true);
                });
            });

            describe('Licenses Card', () => {
                it('Is card header `Licenses`', () => {
                    let cardTitle = licensesCard.$$(titleClassString).get(0);
                    expect(cardTitle.getText()).toContain('Licenses');
                });
            });
    
            describe('Insights Card', () => {
                it('Is card header `Insights`', () => {
                    let cardTitle = insightsCard.$$(titleClassString).get(0);
                    expect(cardTitle.getText()).toContain('Insights');
                });
            });
    
            describe('Component Details Card', () => {
                it('Is card header `Component Details`', () => {
                    let cardTitle = componentDetailsCard.$$(titleClassString).get(0);
                    expect(cardTitle.getText()).toContain('Dependency Details');
                });
            });
        });
    
        describe('Details Section', () => {
            it('Is title in details for Security card correct ?', () => {
                let titleElement = cardDetailsContainer.$$('h2').get(0);
                expect(titleElement.getText()).toEqual('Dependencies with security issues in your stack');
            });

            it('Is Licenses card highlighted on click ?', () => {
                licensesCard.click().then(() => {
                    expect(licensesCard.$$('.analytics-summary-card.highlight').get(0).isPresent()).toBe(true);
                });
            });
    
            it('Is title in details for Licenses card correct ?', () => {
                let titleElement = cardDetailsContainer.$$('h2').get(0);
                expect(titleElement.getText()).toEqual('License details of dependencies in your stack');
            });

            it('Is Insights card highlighted on click ?', () => {
                insightsCard.click().then(() => {
                    expect(insightsCard.$$('.analytics-summary-card.highlight').get(0).isPresent()).toBe(true);
                });
            });
    
            it('Is title in details for Insights card correct ?', () => {
                let titleElement = cardDetailsContainer.$$('h2').get(0);
                expect(titleElement.getText()).toEqual('Complementary dependencies that can augment your stack');
            });

            it('Is Component details card highlighted on click ?', () => {
                componentDetailsCard.click().then(() => {
                    expect(componentDetailsCard.$$('.analytics-summary-card.highlight').get(0).isPresent()).toBe(true);
                });
            });
    
            it('Is title in details for Component details card correct ?', () => {
                let titleElement = cardDetailsContainer.$$('h2').get(0);
                expect(titleElement.getText()).toEqual('Dependency details of your manifest file');
            });
        });
    });
});
