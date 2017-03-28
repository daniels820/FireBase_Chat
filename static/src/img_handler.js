// /** * Created by danielshnayderman on 06/03/2017.*/
//
// export default function imgHandler() {
//     // const canvas = new fabric.Canvas('c');
//    // const screenWidth = screen.width;
//   //  const screenHeight = screen.height;
//
//
//     function getStyles(el) {
//         let selector;
//         let rule;
//         const result = [];
//         const sheets = document.styleSheets;
//         for (let i in sheets) {
//             //rules or cssRules, depending on the browser
//             const rules = sheets[i].rules || sheets[i].cssRules;
//             //iterate over every css rule in the document
//             for (let r in rules)
//             {
//                 selector = rules[r].selectorText;
//                 rule = rules[r].cssText;
//                 //select the element and its children
//                 let $selection = $(el).add($(el).find('*'));
//                 $selection.each(function () {
//                     //console.log($(this),selector);
//                     //for each element, see if it matches the current rule. add if it does
//                     if (selector && selector.indexOf(':')===-1 && $(this).is(selector))
//                     {
//                         if (result.indexOf(rule) === -1) {
//                             result.push(rule);
//                         }
//                         //optionally apply the style as inline to the element.
//                         //this will not preserve style precedence.
//                         $(this).attr('style',rule.match(/\{(.*?)\}/)[1]);
//                     }
//                 });
//             }
//         }
//         return result;
//     }
//
//     $('#btn').click(() => {
//         const svg = document.getElementById('svg');
//         const svgSize = (svg.clientWidth + 'x' + svg.clientHeight);
//
//         alert('width is' + window.innerWidth);
//
//         console.log('css is' + getStyles($('.wrapper')));
//         console.log(svgSize);
//
//         document.getElementById('svg').setAttribute("height", "50px");
//
//
//         let a = $("#svg").attr("href", "/Users/danielshnayderman/WebstormProjects/untitled6/static/img/cool.svg").attr("download", "smile.png");
//         debugger;
//         a[0].click();
//
//     });
//
//
//
//
// }
//
