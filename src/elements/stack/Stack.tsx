import { Responsive, Alignment, Distribution, Spacing } from '../../shared/utilities/Types';
import { elementChildren, wrapWithComponent } from '../../shared/utilities/Utils';
import { classNames, variationName } from '../../shared/utilities/StyleHelpers';
import React, { memo, NamedExoticComponent, ReactNode } from 'react';
import { StackItem } from './StackItem';
import './Stack.scss';

export type StackSpacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';
export type StackWrap = 'wrap' | 'noWrap';

export interface StackProps {
	/** Elements to display inside stack */
	children?: ReactNode;
	/** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
	wrap?: Responsive<StackWrap>;
	/** Stack the elements vertically */
	vertical?: boolean;
	/** Adjust spacing between elements */
	spacing?: Responsive<StackSpacing>;
	/** Adjust vertical alignment of elements */
	alignment?: Responsive<Alignment>;
	/** Adjust horizontal alignment of elements */
	distribution?: Responsive<Distribution>;
	/** Should spacing options affect first child element (works only with Vertical stack) */
	affectFirst?: boolean;
	padding?: Responsive<Spacing>;
	onClick?(): void;
}

/** Stack Props: wrap, vertical, spacing, alignment, distribution, padding, affectFirst, onClick() */
export const Stack = memo(function Stack({
	distribution,
	affectFirst,
	alignment,
	children,
	vertical,
	spacing,
	padding,
	onClick,
	wrap,
}: StackProps) {
	const className = classNames(
		'Stack',
		vertical && 'Stack--Vertical',
		spacing && variationName('Stack--spacing', spacing),
		distribution && variationName('Stack--distribution', distribution),
		alignment && variationName('Stack--alignment', alignment),
		wrap && wrap.length === 2 && variationName('Stack--', wrap),
		wrap === 'noWrap' && 'Stack--noWrap',
		affectFirst && 'Stack--AffectFirst',
		padding && variationName('Stack--Padding', padding),
		onClick && 'Stack--onClick'
	);
	const itemMarkup = elementChildren(children).map((child: any, index: number) => {
		const props = { key: index };
		return wrapWithComponent(child, StackItem, props);
	});

	return (
		<div onClick={onClick} className={className}>
			{itemMarkup}
		</div>
	);
}) as NamedExoticComponent<StackProps> & {
	Item: typeof StackItem;
};

Stack.Item = StackItem;
